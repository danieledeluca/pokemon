<script setup lang="ts">
const { pokemonSpeciesId } = defineProps<{
    pokemonSpeciesId: number;
}>();

const route = useRoute();
const pokemonId = Number(route.params.id);

const { data: pokemonVarieties, pending } = useLazyFetch(`/api/pokemon/varieties/${pokemonSpeciesId}`);
</script>

<template>
    <template v-if="pending">
        <USkeleton class="h-56 w-full" />
    </template>
    <UPageCard v-else-if="pokemonVarieties" variant="subtle" title="Varieties">
        <div class="pokemon-grid">
            <template v-for="variety in pokemonVarieties" :key="variety.id">
                <PokemonVariety v-if="pokemonId !== variety.id" :pokemon="variety" />
            </template>
        </div>
    </UPageCard>
</template>
