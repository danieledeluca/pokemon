<script setup lang="ts">
const { pokemonId } = defineProps<{
    pokemonId: number;
}>();

const { data: pokemon } = await useFetch('/api/sprites', { query: { limit: 10000 } });

const FIRST_ALT_POKEMON_ID = 10001;
const lastBasePokemonId = getIdFromUrl(
    pokemon.value?.results
        .filter((result) => getIdFromUrl(result.url) < FIRST_ALT_POKEMON_ID)
        .at(-1)?.url,
);

const showPreviousButton = pokemonId > 1;
const showNextButton = pokemonId < getIdFromUrl(pokemon?.value?.results.at(-1)?.url);

const previousPokemonId = ref<number>();
const nextPokemonId = ref<number>();

if (pokemonId > 1) {
    const { error } = await useFetch(`/api/sprites/${pokemonId - 1}`);

    previousPokemonId.value = error.value ? lastBasePokemonId : pokemonId - 1;
}

if (pokemonId < getIdFromUrl(pokemon.value?.results.at(-1)?.url)) {
    const { error } = await useFetch(`/api/sprites/${pokemonId + 1}`);

    nextPokemonId.value = error.value ? FIRST_ALT_POKEMON_ID : pokemonId + 1;
}
</script>

<template>
    <div class="navigation" role="group">
        <button v-if="!showPreviousButton" type="button" class="secondary" disabled>
            <span>Previous</span>
        </button>
        <NuxtLink v-else role="button" class="secondary" :to="`/sprites/${previousPokemonId}`">
            <span>Previous</span>
        </NuxtLink>
        <button v-if="!showNextButton" type="button" class="secondary" disabled>
            <span>Next</span>
        </button>
        <NuxtLink v-else role="button" class="secondary" :to="`/sprites/${nextPokemonId}`">
            <span>Next</span>
        </NuxtLink>
    </div>
</template>
