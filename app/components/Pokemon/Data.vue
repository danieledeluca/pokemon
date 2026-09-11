<script setup lang="ts">
import type { Pokemon } from 'pokenode-ts';

import { resourceId } from 'pokenode-ts';

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const { data: pokemonDetails } = useLazyFetch(`/api/pokemon/details/${pokemon.id}`);

const pokemonSpeciesId = resourceId(pokemon.species.url);
</script>

<template>
    <div class="space-y-4 sm:space-y-6 lg:space-y-8">
        <UPageCard
            variant="subtle"
            :title="pokemonDetails?.name"
            :ui="{
                title: 'text-2xl',
            }"
        >
            <div v-if="pokemonDetails?.flavourText" class="text-lg">
                {{ pokemonDetails.flavourText }}
            </div>
            <div>
                <strong>Height </strong>
                <span>{{ pokemon.height / 10 }} m</span>
            </div>
            <div>
                <strong>Weight </strong>
                <span>{{ pokemon.weight / 10 }} kg</span>
            </div>
            <div>
                <strong>Types </strong>
                <span class="inline-flex flex-wrap gap-1 align-middle">
                    <PokemonType v-for="type in pokemon.types" :key="type.slot" :pokemonType="type" />
                </span>
            </div>
        </UPageCard>
        <UPageCard v-if="pokemonDetails?.hasEvolutionChain" variant="subtle" title="Evolutions">
            <div class="pokemon-grid">
                <PokemonEvolutionChain :pokemonSpeciesId />
            </div>
        </UPageCard>
        <UPageCard v-if="pokemonDetails?.hasVarieties" variant="subtle" title="Varieties">
            <div class="pokemon-grid">
                <PokemonVarieties :pokemonSpeciesId />
            </div>
        </UPageCard>
        <UPageCard v-if="pokemonDetails?.hasForms" variant="subtle" title="Forms">
            <div class="pokemon-grid">
                <PokemonForms :pokemonId="pokemon.id" />
            </div>
        </UPageCard>
    </div>
</template>
