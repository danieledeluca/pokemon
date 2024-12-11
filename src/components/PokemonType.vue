<script setup lang="ts">
import { getImageUrl } from '@/utils';
import Tooltip from './Tooltip.vue';

const props = defineProps<{
    pokemonType: string;
    size: 'small' | 'large';
}>();

function getTypeImage(type: string) {
    return getImageUrl(`pokemon-types/${type.toLowerCase()}.png`);
}
</script>

<template>
    <span>
        <img :src="getTypeImage(props.pokemonType)" :alt="props.pokemonType" :class="props.size" />
        <Tooltip :text="pokemonType" />
    </span>
</template>

<style scoped>
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
