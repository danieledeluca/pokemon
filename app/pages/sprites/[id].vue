<script setup lang="ts">
const route = useRoute();
const pokemonId = route.params.id as string;

const { data: pokemon, error } = await useFetch(`/api/sprites/${pokemonId}`);

if (error.value) {
    throw createError({
        statusCode: error.value?.response?.status,
        statusMessage: error.value?.response?.statusText,
    });
}

const { headerHeight } = useHeader();
const { name, flavourText } = await usePokemon(pokemon.value!);

const image =
    pokemon.value?.sprites.versions['generation-v']['black-white'].animated.front_default ||
    pokemon.value?.sprites.front_default ||
    '';

useSeoMeta({
    title: name,
    description: flavourText,
});
</script>

<template>
    <div v-if="pokemon" class="detail pokemon">
        <aside :style="`--header-height: ${headerHeight}px;`">
            <div class="image">
                <AppImage :src="image" :alt="name" :showPlaceholder="false" />
            </div>
            <PokemonNavigation :pokemonId="Number(pokemonId)" />
        </aside>
        <PokemonData :pokemon="pokemon" />
    </div>
</template>

<style scoped>
img {
    width: 100%;
    image-rendering: pixelated;
    aspect-ratio: 1;
    object-fit: contain;
}
</style>
