<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    src: string;
    alt: string;
}>();

const isLoading = ref(true);
const hasError = ref(false);
</script>

<template>
    <div class="image-wrapper">
        <img v-if="hasError" src="@/assets/no-image.png" alt="No image found" />
        <template v-else>
            <div :aria-busy="isLoading"></div>
            <img :src="props.src" :alt="props.alt" loading="lazy" @load="isLoading = false" @error="hasError = true" />
        </template>
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
</style>
