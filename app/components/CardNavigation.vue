<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { card } = defineProps<{
    card: PokemonTCG.Card;
}>();

const { query } = useTcgFilters<PokemonTCG.Card>('number', 'asc');
const { data } = await useFetch(`/api/sets/${card.set.id}`, { query });

const cards = data.value?.cards;
const cardIndex = cards?.findIndex((_card) => _card.id === card.id) || 0;

const showPreviousButton = cardIndex > 0;
const showNextButton = cardIndex < card.set.total - 1;

const previousCardId = cards?.[cardIndex - 1]?.id;
const nextCardId = cards?.[cardIndex + 1]?.id;
</script>

<template>
    <div class="navigation" role="group">
        <button v-if="!showPreviousButton" type="button" class="secondary" disabled>
            <span>Previous</span>
        </button>
        <NuxtLink v-else :to="`/cards/${previousCardId}`" role="button" class="secondary">
            <span>Previous</span>
        </NuxtLink>
        <button v-if="!showNextButton" type="button" class="secondary" disabled>
            <span>Next</span>
        </button>
        <NuxtLink v-else :to="`/cards/${nextCardId}`" role="button" class="secondary">
            <span>Next</span>
        </NuxtLink>
    </div>
</template>
