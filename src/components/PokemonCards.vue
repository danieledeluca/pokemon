<script setup lang="ts">
import type { PokemonCard } from '@/utils/models';
import { showItem } from '@/utils/pokemon';
import LazyImage from './LazyImage.vue';

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
            v-show="
                showItem<PokemonCard>(pokemonCard, props.pokemonCardsFiltered, ['name', 'rarity', 'type', 'subtype'])
            "
        >
            <RouterLink :to="{ name: 'card', params: { card_id: pokemonCard.id } }">
                <LazyImage :src="pokemonCard.images.small" :alt="pokemonCard.name" />
            </RouterLink>
            <div class="box-name">
                <span>{{ pokemonCard.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
}

.card a {
    position: relative;
    flex: 1;
    aspect-ratio: 8/11;
}
</style>
