<script setup lang="ts">
import type { CardList } from '@tcgdex/sdk';

const { cards = undefined } = defineProps<{
    cards?: CardList;
}>();
</script>

<template>
    <div v-if="cards?.length" class="pokemon-grid">
        <div v-for="card in cards" :key="card.id" class="card">
            <NuxtLink :to="`/cards/${card.id}`" class="image">
                <AppImage :src="`${card.image}/low.png`" :alt="card.name" />
            </NuxtLink>
            <div class="name">
                <span>{{ card.name }}</span>
            </div>
        </div>
    </div>
</template>
