<script setup lang="ts">
const route = useRoute();
const pokemonId = route.params.id as string;

const { data, error, status } = await useLazyFetch(`/api/pokemon/${pokemonId}`);
const pokemon = computed(() => data.value?.pokemon);
const pokemonSpecies = computed(() => data.value?.pokemonSpecies);
const pokemonForms = computed(() => data.value?.pokemonForms);
const pokemonEvolutionChain = computed(() => data.value?.pokemonEvolutionChain);

const name = computed(() =>
    getPokemonName(pokemon.value, pokemonSpecies.value, pokemonForms.value),
);

const { headerHeight } = useHeader();

useSeoMeta({
    title: name,
    description: () => parsePokemonFlavorText(pokemonSpecies.value?.flavor_text_entries),
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="pokemon" />
    <AppMessage
        v-if="status === 'error' && error"
        type="error"
        :text="error.statusMessage || error.message"
    />
    <template v-if="status === 'success'">
        <div v-if="pokemon" class="detail pokemon">
            <aside :style="`--header-height: ${headerHeight}px;`">
                <div class="image">
                    <AppImage
                        :src="getPokemonImage(pokemon)"
                        :alt="name"
                        :showPlaceholder="false"
                    />
                </div>
                <PokemonNavigation />
            </aside>
            <PokemonData
                v-if="pokemonSpecies && pokemonForms && pokemonEvolutionChain"
                :pokemon="pokemon"
                :pokemonSpecies="pokemonSpecies"
                :pokemonForms="pokemonForms"
                :pokemonEvolutionChain="pokemonEvolutionChain"
            />
        </div>
        <AppMessage v-else text="We couldn't find the pokemon you are looking for" type="warning" />
    </template>
</template>

<style scoped>
.image {
    padding: 1rem;
    aspect-ratio: 1;
}

img {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    object-fit: contain;
}
</style>
