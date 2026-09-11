<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Sets',
        to: '/sets',
        active: route.path.startsWith('/sets'),
    },
    {
        label: 'Cards',
        to: '/cards',
        active: route.path.startsWith('/cards'),
        external: route.name === 'cards',
    },
    {
        label: 'Pokémon',
        to: '/pokemon',
        active: route.path.startsWith('/pokemon'),
        external: route.name === 'pokemon',
    },
]);
</script>

<template>
    <UHeader title="Pokémon Vault" to="/" mode="drawer">
        <UNavigationMenu :items="items" />

        <template #right>
            <UColorModeButton />

            <UTooltip text="Open on GitHub">
                <UButton
                    color="neutral"
                    variant="ghost"
                    to="https://github.com/danieledeluca/pokemon"
                    target="_blank"
                    icon="i-simple-icons-github"
                />
            </UTooltip>
        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>
