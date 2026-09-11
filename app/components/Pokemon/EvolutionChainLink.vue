<script setup lang="ts">
import type { ChainLink } from 'pokenode-ts';

import { resourceId } from 'pokenode-ts';

const { chainLink, index } = defineProps<{
    chainLink: ChainLink;
    index: number;
}>();

const pokemonId = resourceId(chainLink.species.url);

const { data: pokemonDetails, pending } = useLazyFetch(`/api/pokemon/details/${pokemonId}`);

const maxEvolutionChainLength = chainLink.evolves_to.length > 0
    ? Math.max(...chainLink.evolves_to.map((_chainLink) => _chainLink.evolves_to.length))
    : 0;

const colStart = index + 1;
const colEnd = colStart + maxEvolutionChainLength + 1;
</script>

<template>
    <PokemonImage
        :pokemonId
        :pokemonName="pokemonDetails?.name"
        :pokemonSpriteUrl="pokemonDetails?.spriteUrl"
        :pending
    >
        <UIcon
            v-if="chainLink.evolves_to.length > 0"
            name="i-lucide-chevron-right"
            class="absolute top-1/2 -right-4 -translate-y-1/2"
        />
    </PokemonImage>
    <div
        v-if="chainLink.evolves_to.length > 1"
        class="col-start-(--col-start) col-end-(--col-end) grid grid-cols-subgrid gap-4"
        :style="{
            '--col-start': colStart,
            '--col-end': chainLink.evolves_to.length > 3 ? -1 : colEnd,
        }"
    >
        <div
            v-for="subChainLink in chainLink.evolves_to"
            :key="subChainLink.species.name"
            class="col-span-(--col-span) grid grid-cols-subgrid gap-4"
            :style="{
                '--col-span': colEnd - colStart,
            }"
        >
            <PokemonEvolutionChainLink :chainLink="subChainLink" :index="index + 1" />
        </div>
    </div>
    <template v-else>
        <PokemonEvolutionChainLink
            v-for="subChainLink in chainLink.evolves_to"
            :key="subChainLink.species.name"
            :chainLink="subChainLink"
            :index="index + 1"
        />
    </template>
</template>
