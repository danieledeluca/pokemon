<script setup lang="ts">
import type { Pokemon } from 'pokenode-ts';

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const { data: pokemonDetails, pending } = useLazyFetch(`/api/pokemon/details/${pokemon.id}`);
</script>

<template>
    <PokemonImage
        :pokemonId="pokemon.id"
        :pokemonName="pokemonDetails?.name"
        :pokemonSpriteUrl="pokemonDetails?.spriteUrl"
        :pending
    />
</template>
