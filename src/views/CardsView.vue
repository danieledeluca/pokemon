<script setup lang="ts">
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import PokemonCards from '@/components/PokemonCards.vue';
import PokemonCardSearchForm from '@/components/PokemonCardSearchForm.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getSearchParam } from '@/utils';
import type { PokemonCardFilters } from '@/utils/models';
import { useDebounceFn } from '@vueuse/core';
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';

const filters: PokemonCardFilters = reactive({
    name: getSearchParam('name'),
    rarity: getSearchParam('rarity'),
    type: getSearchParam('type'),
    subtype: getSearchParam('subtype'),
});
const hasFilters = computed(() => Object.values(filters).some((value) => value));

const pokemonStore = usePokemonStore();
const pokemonCards = computed(() => pokemonStore.pokemonCardsBySearch);
const pokemonCardRarities = computed(() => pokemonStore.pokemonCardRarities);
const pokemonCardTypes = computed(() => pokemonStore.pokemonCardTypes);
const pokemonCardSubtypes = computed(() => pokemonStore.pokemonCardSubtypes);

const handleUpdateName = useDebounceFn((newName: string) => {
    filters.name = newName;
}, 1000);
const handleUpdateFilters = (newFilters: Omit<PokemonCardFilters, 'name'>) => {
    filters.rarity = newFilters.rarity;
    filters.type = newFilters.type;
    filters.subtype = newFilters.subtype;
};

const handleLoadMore = async () => {
    await pokemonStore.getPokemonCardsBySearch(
        filters.name,
        filters.rarity,
        filters.type,
        filters.subtype,
        pokemonCards.value.responseStatus.nextUrl,
        pokemonCards.value.data
    );
};

watch(filters, async (newFilters) => {
    await pokemonStore.getPokemonCardsBySearch(
        newFilters.name,
        newFilters.rarity,
        newFilters.type,
        newFilters.subtype
    );
});

onMounted(() => {
    if (!pokemonCards.value.data.length || hasFilters.value) {
        pokemonStore.getPokemonCardsBySearch(
            filters.name,
            filters.rarity,
            filters.type,
            filters.subtype
        );
    }

    if (!pokemonCardRarities.value.length) {
        pokemonStore.getPokemonCardRarities();
    }

    if (!pokemonCardTypes.value.length) {
        pokemonStore.getPokemonCardTypes();
    }

    if (!pokemonCardSubtypes.value.length) {
        pokemonStore.getPokemonCardSubtypes();
    }
});

onUnmounted(() => {
    if (hasFilters.value) {
        pokemonCards.value.data = [];
    }
});
</script>

<template>
    <PokemonCardSearchForm
        :isDisabled="pokemonCards.responseStatus.isLoading || !!pokemonCards.responseStatus.error"
        :rarities="pokemonCardRarities"
        :types="pokemonCardTypes"
        :subtypes="pokemonCardSubtypes"
        @updateName="handleUpdateName"
        @updateFilters="handleUpdateFilters"
    />
    <template v-if="pokemonCards.responseStatus.ok">
        <PokemonCards :pokemonCards="pokemonCards.data" />
        <Message
            v-if="!pokemonCards.data.length && Object.values(filters).some((value) => value)"
            type="error"
            text="No cards found"
        />
    </template>
    <Message
        v-if="pokemonCards.responseStatus.error"
        type="error"
        :text="pokemonCards.responseStatus.error"
    />
    <LoadingState :responseStatus="pokemonCards.responseStatus" @loadMore="handleLoadMore" />
</template>
