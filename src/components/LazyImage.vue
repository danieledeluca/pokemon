<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    src: string;
    alt: string;
}>();

const isLoading = ref(true);

function handleLoad() {
    isLoading.value = false;
}
</script>

<template>
    <div class="image-wrapper">
        <div :aria-busy="isLoading"></div>
        <img :src="props.src" :alt="props.alt" loading="lazy" @load="handleLoad" />
    </div>
</template>

<style scoped>
[aria-busy='true'] {
    position: absolute;
    inset: 0;
}

[aria-busy='true']::before {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}

img {
    width: 100%;
}
</style>
