<script setup lang="ts">
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import PokemonCards from '@/components/PokemonCards.vue';
import SearchForm from '@/components/SearchForm.vue';
import { clearSearchParams, getSearchParam, setSearchParam } from '@/utils';
import { usePokemonStore } from '@/stores/pokemon';
import { useDebounceFn } from '@vueuse/core';
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const filters = reactive({
    name: getSearchParam('name'),
    rarity: getSearchParam('rarity'),
    type: getSearchParam('type'),
    subtype: getSearchParam('subtype'),
});

const pokemonStore = usePokemonStore();
const pokemonCards = computed(() => pokemonStore.pokemonCardsBySearch);
const pokemonCardRarities = computed(() => pokemonStore.pokemonCardRarities);
const pokemonCardTypes = computed(() => pokemonStore.pokemonCardTypes);
const pokemonCardSubtypes = computed(() => pokemonStore.pokemonCardSubtypes);

const handleUpdateFilter = useDebounceFn((newFilter: string) => {
    filters.name = newFilter;
}, 1000);

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
    Object.entries(newFilters).forEach(([key, value]) => {
        setSearchParam(key, value);
    });

    await pokemonStore.getPokemonCardsBySearch(newFilters.name, newFilters.rarity, newFilters.type, newFilters.subtype);
});

onMounted(() => {
    if (!pokemonCards.value.data.length) {
        pokemonStore.getPokemonCardsBySearch(filters.name, filters.rarity, filters.type, filters.subtype);
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
    if (Object.values(filters).some((value) => value)) {
        pokemonCards.value.data = [];
    }
});

onBeforeRouteLeave(() => clearSearchParams());
</script>

<template>
    <SearchForm
        name="card"
        :is-disabled="pokemonCards.responseStatus.isLoading || !!pokemonCards.responseStatus.error"
        @update-filter="handleUpdateFilter"
    >
        <fieldset class="grid" :disabled="pokemonCards.responseStatus.isLoading || !!pokemonCards.responseStatus.error">
            <label>
                Select a card rarity
                <select v-model="filters.rarity" :disabled="!pokemonCardRarities.length">
                    <option selected value="">All rarities</option>
                    <option
                        v-for="pokemonCardRarity in pokemonCardRarities"
                        :key="pokemonCardRarity"
                        :value="pokemonCardRarity"
                    >
                        {{ pokemonCardRarity }}
                    </option>
                </select>
            </label>
            <label>
                Select a card type
                <select v-model="filters.type" :disabled="!pokemonCardTypes.length">
                    <option selected value="">All types</option>
                    <option v-for="pokemonCardType in pokemonCardTypes" :key="pokemonCardType" :value="pokemonCardType">
                        {{ pokemonCardType }}
                    </option>
                </select>
            </label>
            <label>
                Select a card subtype
                <select v-model="filters.subtype" :disabled="!pokemonCardSubtypes.length">
                    <option selected value="">All subtypes</option>
                    <option
                        v-for="pokemonCardSubtype in pokemonCardSubtypes"
                        :key="pokemonCardSubtype"
                        :value="pokemonCardSubtype"
                    >
                        {{ pokemonCardSubtype }}
                    </option>
                </select>
            </label>
        </fieldset>
    </SearchForm>
    <template v-if="pokemonCards.responseStatus.ok">
        <PokemonCards :pokemon-cards="pokemonCards.data" />
        <Message
            v-if="!pokemonCards.data.length && Object.values(filters).some((value) => value)"
            type="error"
            text="No cards found"
        />
    </template>
    <Message v-if="pokemonCards.responseStatus.error" type="error" :text="pokemonCards.responseStatus.error" />
    <LoadingState :response-status="pokemonCards.responseStatus" @load-more="handleLoadMore" />
</template>
