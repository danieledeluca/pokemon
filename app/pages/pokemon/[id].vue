<script setup lang="ts">
import { getPokemonSpriteUrl } from 'pokenode-ts';

const route = useRoute();
const pokemonId = Number(route.params.id);

const { data: pokemon, pending, error } = useLazyFetch(`/api/pokemon/${pokemonId}`);
const { data: pokemonDetails } = useLazyFetch(`/api/pokemon/details/${pokemonId}`);

const pokemonName = computed(() => pokemonDetails.value?.name);

useSeoMeta({
    title: () => pokemonName.value,
    description: () => `Discover sprites, types and evolutions for ${pokemonName.value}.`,
});

const spriteUrl = computed(() => {
    return pokemon.value?.sprites.versions['generation-v']['black-white'].animated.front_default
        || getPokemonSpriteUrl(pokemonId);
});
</script>

<template>
    <template v-if="pending">
        <div class="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <div>
                <USkeleton class="aspect-square w-full" />
                <USkeleton class="mt-4 h-8 w-full sm:mt-6 lg:mt-8" />
            </div>
            <USkeleton class="h-66 w-full md:col-span-2" />
        </div>
    </template>
    <AppError v-else-if="error" :error />
    <template v-else-if="pokemon">
        <div class="grid items-start gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <div class="sticky md:top-[calc(var(--ui-header-height)+var(--spacing)*6)] lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                <div class="flex aspect-square items-center justify-center">
                    <AppImage
                        :src="spriteUrl"
                        :alt="pokemonName"
                        class="image-pixelated size-full object-contain"
                        placeholder="/placeholders/egg.gif"
                    />
                </div>
                <div class="mt-4 sm:mt-6 lg:mt-8">
                    <PokemonNavigation :pokemonId />
                </div>
            </div>
            <div class="md:col-span-2">
                <PokemonData :pokemon />
            </div>
        </div>
    </template>
</template>
