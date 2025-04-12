<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { type, size } = defineProps<{
    type: PokemonTCG.Type | string;
    size: 'small' | 'large';
}>();
</script>

<template>
    <span :data-tooltip="type">
        <img :src="getImage(`card-types/${type.toLowerCase()}.png`)" :alt="type" :class="size" />
    </span>
</template>

<style scoped>
span {
    display: inline-block;
}

img {
    display: block;
}

img.small {
    width: 1rem;
}

img.large {
    width: 2rem;
}
</style>
