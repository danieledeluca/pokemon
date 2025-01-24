<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { cards } = defineProps<{
    cards?: PokemonTCG.Card[];
}>();
</script>

<template>
    <div v-if="cards?.length" class="pokemon-grid">
        <div v-for="card in cards" :key="card.id" class="card">
            <NuxtLink :to="`/cards/${card.id}`" class="image">
                <AppImage :src="card.images.small" :alt="card.name" />
            </NuxtLink>
            <div class="name">
                <span>{{ card.name }}</span>
            </div>
        </div>
    </div>
</template>
