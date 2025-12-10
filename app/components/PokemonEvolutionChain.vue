<script setup lang="ts">
const { evolutionChain } = defineProps<{
    evolutionChain: PokemonEvolutionChain;
}>();

const maxEvolutionChainLength = Math.max(
    ...evolutionChain.evolves_to.map((evolution) => evolution.evolves_to.length),
);

const colStart = evolutionChain.index + 1;
const colEnd = colStart + maxEvolutionChainLength + 1;
</script>

<template>
    <PokemonEvolutionChainSingle :evolutionChain="evolutionChain" />
    <div
        v-if="evolutionChain.evolves_to.length > 1"
        class="split"
        :style="{
            '--col-start': colStart,
            '--col-end': evolutionChain.evolves_to.length > 3 ? -1 : colEnd,
            '--col-span': colEnd - colStart,
        }"
    >
        <div
            v-for="subEvolutionChain in evolutionChain.evolves_to"
            :key="subEvolutionChain.name"
            class="evolution-line"
            :style="{ '--col-span': colEnd - colStart }"
        >
            <PokemonEvolutionChain :evolutionChain="subEvolutionChain" />
        </div>
    </div>
    <PokemonEvolutionChain
        v-for="subEvolutionChain in evolutionChain.evolves_to"
        v-else
        :key="subEvolutionChain.name"
        :evolutionChain="subEvolutionChain"
    />
</template>

<style scoped>
.split {
    display: grid;
    grid-template-columns: subgrid;
    gap: 1rem;
    grid-column: var(--col-start) / var(--col-end);
}

.evolution-line {
    display: grid;
    grid-template-columns: subgrid;
    gap: 1rem;
    grid-column: span var(--col-span);
}
</style>
