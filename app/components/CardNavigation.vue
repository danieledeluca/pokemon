<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { card } = defineProps<{
    card: PokemonTCG.Card;
}>();

const { query } = useFilters<PokemonTCG.Card>('number', 'asc');
const { data: cards } = await useFetch(`/api/sets/${card.set.id}`, { query });
const cardIndex = cards.value?.findIndex((_card) => _card.id === card.id) || 0;

const showPreviousButton = cardIndex > 0;
const showNextButton = cardIndex < card.set.total - 1;

const previousCardId = cards.value?.[cardIndex - 1]?.id;
const nextCardId = cards.value?.[cardIndex + 1]?.id;
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

<style scoped>
.navigation {
    margin-top: 1rem;
}

.navigation > * {
    width: 100%;
}
</style>
