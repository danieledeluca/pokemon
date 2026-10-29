<script setup lang="ts">
const { pokemonSpeciesId } = defineProps<{
    pokemonSpeciesId: number;
}>();

const { data: evolutionChain, pending } = useLazyFetch(`/api/pokemon/evolution/${pokemonSpeciesId}`);
</script>

<template>
    <template v-if="pending">
        <USkeleton class="h-56 w-full" />
    </template>
    <UPageCard
        v-else-if="evolutionChain && evolutionChain.chain.evolves_to.length > 0"
        variant="subtle"
        title="Evolutions"
    >
        <div class="pokemon-grid">
            <PokemonEvolutionChainLink :chainLink="evolutionChain.chain" :index="1" />
        </div>
    </UPageCard>
</template>
