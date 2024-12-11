<script setup lang="ts">
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import PokemonCards from '@/components/PokemonCards.vue';
import PokemonCardSearchForm from '@/components/PokemonCardSearchForm.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getSearchParam } from '@/utils';
import type { PokemonCardFilters } from '@/utils/models';
import { useDebounceFn } from '@vueuse/core';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const setId = route.params.set_id as string;

const filters: PokemonCardFilters = reactive({
    name: getSearchParam('name'),
    rarity: getSearchParam('rarity'),
    type: getSearchParam('type'),
    subtype: getSearchParam('subtype'),
});

const pokemonStore = usePokemonStore();
const pokemonCards = computed(() => pokemonStore.pokemonCardsBySet);
const pokemonCardsFiltered = computed(() => {
    return pokemonCards.value.data[setId]?.filter((pokemonCard) => {
        return (
            pokemonCard.name.toLowerCase().indexOf(filters.name.toLowerCase().trim()) >= 0 &&
            (filters.rarity ? pokemonCard.rarity === filters.rarity : true) &&
            (filters.type ? pokemonCard.types?.includes(filters.type) : true) &&
            (filters.subtype ? pokemonCard.subtypes?.includes(filters.subtype) : true)
        );
    });
});
const pokemonCardRarities = computed(() =>
    pokemonCards.value.data[setId]?.reduce((acc, card) => {
        if (card.rarity) {
            acc.add(card.rarity);
        }

        return acc;
    }, new Set<string>())
);
const pokemonCardTypes = computed(() =>
    pokemonCards.value.data[setId]?.reduce((acc, card) => {
        card.types?.forEach((type) => acc.add(type));

        return acc;
    }, new Set<string>())
);
const pokemonCardSubtypes = computed(() =>
    pokemonCards.value.data[setId]?.reduce((acc, card) => {
        card.subtypes?.forEach((subType) => acc.add(subType));

        return acc;
    }, new Set<string>())
);

const handleUpdateName = useDebounceFn((newName: string) => {
    filters.name = newName;
}, 1000);

const handleUpdateFilters = (newFilters: Omit<PokemonCardFilters, 'name'>) => {
    filters.rarity = newFilters.rarity;
    filters.type = newFilters.type;
    filters.subtype = newFilters.subtype;
};

onMounted(async () => {
    if (!pokemonCards.value.data[setId]?.length) {
        await pokemonStore.getPokemonCardsBySet(setId);
    }
});
</script>

<template>
    <div class="set-image">
        <img :src="`https://images.pokemontcg.io/${setId}/logo.png`" :alt="setId" />
    </div>
    <PokemonCardSearchForm
        :isDisabled="pokemonCards.responseStatus.isLoading || !!pokemonCards.responseStatus.error"
        :rarities="[...(pokemonCardRarities || [])]"
        :types="[...(pokemonCardTypes || [])]"
        :subtypes="[...(pokemonCardSubtypes || [])]"
        @updateName="handleUpdateName"
        @updateFilters="handleUpdateFilters"
    />
    <template v-if="pokemonCards.responseStatus.ok && pokemonCards.data[setId]?.length">
        <PokemonCards :pokemonCards="pokemonCards.data[setId]" :pokemonCardsFiltered="pokemonCardsFiltered" />
        <Message
            v-if="!pokemonCardsFiltered?.length"
            type="error"
            text="No cards found, try again with different filters"
        />
    </template>
    <Message v-if="pokemonCards.responseStatus.error" type="error" :text="pokemonCards.responseStatus.error" />
    <LoadingState :responseStatus="pokemonCards.responseStatus" />
</template>

<style scoped>
.set-image {
    margin-block: 1rem 2rem;
    text-align: center;
}

.set-image img {
    max-width: 200px;
}
</style>
