<script setup lang="ts">
import { showItem } from '@/composables/pokemon';
import type { PokemonSprite } from '@/models';

const props = defineProps<{
    pokemonSprites: PokemonSprite[];
    pokemonSpritesFiltered?: PokemonSprite[];
    pokemonSpriteType: string;
}>();
</script>

<template>
    <div v-if="props.pokemonSprites.length" class="pokemon-grid">
        <div
            v-for="pokemonSprite in pokemonSprites"
            :key="pokemonSprite.name"
            class="sprite"
            v-show="showItem<PokemonSprite>(pokemonSprite, props.pokemonSpritesFiltered)"
        >
            <article class="sprite-image">
                <img
                    v-for="[type, sprite] in Object.entries(pokemonSprite.sprites)"
                    v-show="type === (props.pokemonSpriteType || 'front-default')"
                    :key="type"
                    :src="sprite"
                    :alt="pokemonSprite.name"
                    loading="lazy"
                    :class="type"
                />
            </article>
            <div class="box-name">
                <span>{{ pokemonSprite.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sprite-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    aspect-ratio: 1;
}

.front-default,
.front-shiny {
    width: 100%;
    image-rendering: pixelated;
}
</style>
