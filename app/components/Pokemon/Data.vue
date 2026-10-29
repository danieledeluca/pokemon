<script setup lang="ts">
import type { Pokemon } from 'pokenode-ts';

import { resourceId } from 'pokenode-ts';

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const { data: pokemonDetails, pending } = useLazyFetch(`/api/pokemon/details/${pokemon.id}`);

const pokemonSpeciesId = resourceId(pokemon.species.url);
</script>

<template>
    <div class="space-y-4 sm:space-y-6 lg:space-y-8">
        <template v-if="pending">
            <USkeleton class="h-66 w-full" />
        </template>
        <UPageCard
            v-else-if="pokemonDetails"
            variant="subtle"
            :title="pokemonDetails.name"
            :ui="{ title: 'text-2xl' }"
        >
            <div v-if="pokemonDetails.flavourText" class="text-lg">
                {{ pokemonDetails.flavourText }}
            </div>
            <div class="data-table">
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-ruler" />
                        <span>Height</span>
                    </div>
                    <span>{{ pokemon.height / 10 }}m</span>
                </div>
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-weight" />
                        <span>Weight</span>
                    </div>
                    <span>{{ pokemon.weight / 10 }}kg</span>
                </div>
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-shapes" />
                        <span>Types</span>
                    </div>
                    <span class="inline-flex flex-wrap gap-1 align-middle">
                        <PokemonType v-for="type in pokemon.types" :key="type.slot" :pokemonType="type" />
                    </span>
                </div>
            </div>
        </UPageCard>
        <PokemonEvolutionChain v-if="pokemonDetails?.hasEvolutionChain" :pokemonSpeciesId />
        <PokemonVarieties v-if="pokemonDetails?.hasVarieties" :pokemonSpeciesId />
        <PokemonForms v-if="pokemonDetails?.hasForms" :pokemonId="pokemon.id" />
    </div>
</template>
