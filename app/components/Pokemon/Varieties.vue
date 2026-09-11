<script setup lang="ts">
const { pokemonSpeciesId } = defineProps<{
    pokemonSpeciesId: number;
}>();

const route = useRoute();
const pokemonId = Number(route.params.id);

const { data: pokemonVarieties } = useLazyFetch(`/api/pokemon/varieties/${pokemonSpeciesId}`);
</script>

<template>
    <template v-if="pokemonVarieties">
        <template v-for="variety in pokemonVarieties" :key="variety.id">
            <PokemonVariety v-if="pokemonId !== variety.id" :pokemon="variety" />
        </template>
    </template>
</template>
