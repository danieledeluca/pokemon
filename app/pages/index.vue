<script setup lang="ts">
import type { PageCardProps } from '@nuxt/ui';

// eslint-disable-next-line style/max-len
const heroDescription = 'Your all-in-one hub for the Pokémon universe — browse the Pokédex, dive into TCG sets, and search every card in one place.';

useSeoMeta({
    description: heroDescription,
});

const pageCards = ref<PageCardProps[]>([
    {
        title: 'Pokémon sets',
        description: 'Browse every trading card game expansion, from the very first release to the latest.',
        icon: 'i-lucide-layers',
        to: '/sets/',
        variant: 'subtle',
    },
    {
        title: 'Pokémon cards',
        description: 'Search and explore every Pokémon card available, filtering by name.',
        icon: 'i-lucide-images',
        to: '/cards/',
        variant: 'subtle',
    },
    {
        title: 'Pokémon',
        description: 'Discover the full Pokédex, with sprites, evolutions and details for every Pokémon.',
        icon: 'i-lucide-paw-print',
        to: '/pokemon',
        variant: 'subtle',
    },
]);
</script>

<template>
    <UPageHero
        title="Pokémon Vault"
        :description="heroDescription"
        :ui="{
            description: 'text-pretty max-w-2xl mx-auto',
        }"
    />
    <div class="grid gap-8 pb-16 sm:grid-cols-2 sm:pb-24 lg:grid-cols-3 lg:pb-32">
        <UPageCard v-for="(card, index) in pageCards" :key="index" v-bind="card" />
    </div>
</template>
