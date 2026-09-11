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
            <div class="space-y-4 sm:space-y-6 md:col-span-2 lg:space-y-8">
                <USkeleton class="h-96 w-full" />
                <USkeleton class="h-48 w-full" />
            </div>
        </div>
    </template>
    <UAlert v-else-if="error" color="error" :title="error.message" />
    <template v-else-if="pokemon">
        <div class="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <div>
                <div class="flex aspect-square items-center justify-center">
                    <AppImage
                        :src="spriteUrl"
                        :alt="pokemonName"
                        class="image-pixelated size-full object-contain"
                        errorClass="p-4 sm:p-6"
                        placeholder="/egg.gif"
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
