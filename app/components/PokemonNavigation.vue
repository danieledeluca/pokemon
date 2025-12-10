<script setup lang="ts">
const FIRST_ALT_POKEMON_ID = 10001;

const route = useRoute();
const pokemonId = Number(route.params.id);

const { data: pokemonList } = await useLazyFetch('/api/pokemon', { query: { limit: 10000 } });

const lastAltPokemonId = computed(() => getIdFromUrl(pokemonList.value?.results.at(-1)?.url));
const lastBasePokemonId = computed(() =>
    getIdFromUrl(
        pokemonList.value?.results
            .filter((result) => getIdFromUrl(result.url) < FIRST_ALT_POKEMON_ID)
            .at(-1)?.url,
    ),
);

const showPreviousButton = pokemonId > 1;
const showNextButton = computed(() => pokemonId < lastAltPokemonId.value);

const previousPokemonId = computed(() =>
    pokemonId === FIRST_ALT_POKEMON_ID ? lastBasePokemonId.value : pokemonId - 1,
);
const nextPokemonId = computed(() =>
    pokemonId === lastBasePokemonId.value ? FIRST_ALT_POKEMON_ID : pokemonId + 1,
);

const showNavigation = computed(
    () =>
        (showPreviousButton || showNextButton.value) &&
        (previousPokemonId.value || nextPokemonId.value),
);
</script>

<template>
    <div v-if="showNavigation" class="navigation" role="group">
        <button v-if="!showPreviousButton" type="button" class="secondary" disabled>
            <span>Previous</span>
        </button>
        <NuxtLink v-else role="button" class="secondary" :to="`/pokemon/${previousPokemonId}`">
            <span>Previous</span>
        </NuxtLink>
        <button v-if="!showNextButton" type="button" class="secondary" disabled>
            <span>Next</span>
        </button>
        <NuxtLink v-else role="button" class="secondary" :to="`/pokemon/${nextPokemonId}`">
            <span>Next</span>
        </NuxtLink>
    </div>
</template>
