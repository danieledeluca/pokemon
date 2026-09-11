<script setup lang="ts">
const { pokemonSpeciesId } = defineProps<{
    pokemonSpeciesId: number;
}>();

const { data: evolutionChain } = useLazyFetch(`/api/pokemon/evolution/${pokemonSpeciesId}`);
</script>

<template>
    <PokemonEvolutionChainLink
        v-if="evolutionChain && evolutionChain.chain.evolves_to.length > 0"
        :chainLink="evolutionChain.chain"
        :index="1"
    />
</template>
