<script setup lang="ts">
import { showItem } from '@/composables/pokemon';
import type { PokemonCard } from '@/models';

const props = defineProps<{
    pokemonCards: PokemonCard[];
    pokemonCardsFiltered?: PokemonCard[];
}>();
</script>

<template>
    <div class="pokemon-grid" v-if="props.pokemonCards.length">
        <div
            class="card"
            v-for="pokemonCard in props.pokemonCards"
            :key="pokemonCard.id"
            v-show="showItem<PokemonCard>(pokemonCard, props.pokemonCardsFiltered)"
        >
            <RouterLink :to="{ name: 'card', params: { card_id: pokemonCard.id } }">
                <img :src="pokemonCard.images.small" :alt="pokemonCard.name" loading="lazy" class="card-image" />
            </RouterLink>
            <div class="box-name">
                <span>{{ pokemonCard.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-image {
    width: 100%;
}
</style>
