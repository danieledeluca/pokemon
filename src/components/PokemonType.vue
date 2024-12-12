<script setup lang="ts">
import Tooltip from './Tooltip.vue';

const props = defineProps<{
    pokemonType: string;
    size: 'small' | 'large';
}>();

const glob = import.meta.glob('@/assets/pokemon-types/*.png', { eager: true });
</script>

<template>
    <span>
        <img
            :src="
                Object.keys(glob).find((key) => key.indexOf(props.pokemonType.toLowerCase()) > -1)
            "
            :alt="props.pokemonType"
            :class="props.size"
        />
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
