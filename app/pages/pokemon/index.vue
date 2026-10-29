<script setup lang="ts">
useSeoMeta({
    title: 'Pokémon',
    description: 'A list of all Pokémon.',
});

const { state, debouncedState } = useQueryState(BaseStateSchema, { name: undefined });
const { state: filtersState } = useQueryState(PokemonFiltersStateSchema, { variant: 'default', shiny: false });
const { data: pokemonGroups, pending, error } = useLazyFetch('/api/pokemon', { query: debouncedState });
</script>

<template>
    <div class="mb-4 space-y-4 sm:mb-6 lg:mb-8">
        <UFieldGroup class="w-full">
            <UInput
                v-model="state.name"
                class="w-full"
                icon="i-lucide-search"
                placeholder="Search for a card"
            />
            <UButton label="Search" :loading="pending" />
        </UFieldGroup>
        <PokemonFilters v-model:filters="filtersState" />
    </div>
    <template v-if="pending">
        <div class="list-grid">
            <div v-for="n in 50" :key="n">
                <USkeleton class="list-card" />
                <USkeleton class="list-title h-6" />
            </div>
        </div>
    </template>
    <AppError v-else-if="error" :error />
    <template v-else-if="pokemonGroups">
        <PokemonList v-if="pokemonGroups.length > 0" v-model:filters="filtersState" :pokemonGroups />
        <AppWarning v-else :title="`No pokemon fond for: ${debouncedState.name}`" />
    </template>
</template>
