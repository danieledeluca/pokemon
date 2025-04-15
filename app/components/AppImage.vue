<script setup lang="ts">
const {
    src,
    alt,
    showPlaceholder = true,
} = defineProps<{
    src: string;
    alt: string;
    showPlaceholder?: boolean;
}>();

const showErrorImage = ref(false);
const isLoaded = ref(false);
</script>

<template>
    <NuxtImg
        v-if="src && !showErrorImage"
        :src
        :alt
        :placeholder="showPlaceholder ? getImage('loading.svg') : ''"
        :class="{ 'is-loaded': isLoaded }"
        densities="1x"
        @error="showErrorImage = true"
        @load="isLoaded = true"
    />
    <img
        v-else
        class="is-loaded"
        src="~/assets/images/no-image.png"
        alt="No image available"
        loading="lazy"
    />
</template>
