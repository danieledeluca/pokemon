<script setup lang="ts">
import type { PokemonSpriteOptions, SpriteVariant } from 'pokenode-ts';

import { getPokemonSpriteUrl } from 'pokenode-ts';

const { pokemonId, variant, shiny } = defineProps<{
    pokemonId: number;
    shiny: boolean;
    variant: SpriteVariant;
}>();

const { data: pokemonDetails, pending } = useLazyFetch(`/api/pokemon/details/${pokemonId}`);

const pokemonName = computed(() => pokemonDetails.value?.name);
const spriteUrl = computed(() => {
    const options: PokemonSpriteOptions = {
        variant,
    };

    if (variant !== 'dream-world') {
        options.shiny = shiny;
    }

    return getPokemonSpriteUrl(pokemonId, options);
});
</script>

<template>
    <div>
        <NuxtLink :to="`/pokemon/${pokemonId}`" :title="pokemonName">
            <UCard variant="soft" class="list-card">
                <AppImage
                    :src="spriteUrl"
                    :alt="pokemonName"
                    placeholder="/egg.gif"
                    class="max-h-full max-w-full"
                />
            </UCard>
        </NuxtLink>
        <template v-if="pending">
            <USkeleton class="list-title h-6" />
        </template>
        <template v-else-if="pokemonName">
            <div class="list-title">
                {{ pokemonName }}
            </div>
        </template>
    </div>
</template>
