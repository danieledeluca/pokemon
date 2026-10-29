<script setup lang="ts">
import type { NamedAPIResource, Pokemon } from 'pokenode-ts';

import { resourceId } from 'pokenode-ts';

const { pokemonGroups } = defineProps<{
    pokemonGroups: NamedAPIResource<Pokemon>[][];
}>();

const filters = defineModel<PokemonFiltersState>('filters', { required: true });

const { getQueryValue } = useQuery();
</script>

<template>
    <template v-for="(pokemon, index) in pokemonGroups" :key="index">
        <div v-if="index + 1 === Number(getQueryValue('page') || 1)" class="list-grid">
            <PokemonCard
                v-for="pkm in pokemon"
                :key="pkm.name"
                :pokemonId="resourceId(pkm.url)"
                :shiny="filters.shiny"
                :variant="filters.variant"
            />
        </div>
    </template>
    <AppPagination v-if="pokemonGroups.length > 1" :total="pokemonGroups.flat().length" />
</template>
