<script setup lang="ts">
import type { PokemonType } from 'pokenode-ts';

import { localize, resourceId } from 'pokenode-ts';

const { pokemonType } = defineProps<{
    pokemonType: PokemonType;
}>();

const { data: type, pending } = useLazyFetch(`/api/pokemon/types/${resourceId(pokemonType.type.url)}`);

const name = computed(() => type.value ? localize(type.value.names)?.name || '' : '');

const bgColors: Record<string, string> = {
    normal: '#919aa1',
    fighting: '#cf466b',
    flying: '#91a8db',
    poison: '#ac6cc4',
    ground: '#d97b4d',
    rock: '#c4b790',
    bug: '#8ec145',
    ghost: '#5568a9',
    steel: '#5a8da0',
    fire: '#ff9f5f',
    water: '#548fd2',
    grass: '#5ebb63',
    electric: '#f2d354',
    psychic: '#fb757b',
    ice: '#71cdc0',
    dragon: '#1c6cbe',
    dark: '#5a5464',
    fairy: '#ee91e2',
};

const textColors: Record<string, string> = {
    fighting: 'var(--color-white)',
    ghost: 'var(--color-white)',
    dragon: 'var(--color-white)',
    dark: 'var(--color-white)',
};
</script>

<template>
    <template v-if="pending">
        <USkeleton class="h-6 w-12" />
    </template>
    <span
        v-else-if="type"
        class="inline-flex items-center justify-center gap-1 rounded-md bg-(--bg-color) px-2 py-1 text-center text-xs font-medium text-(--text-color)"
        :style="{
            '--bg-color': bgColors[type.name],
            '--text-color': textColors[type.name] || 'var(--ui-color-neutral-900)',
        }"
    >
        {{ name }}
    </span>
</template>
