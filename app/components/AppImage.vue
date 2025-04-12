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
</script>

<template>
    <NuxtImg
        v-if="!showErrorImage"
        :src="src"
        :alt="alt"
        :placeholder="showPlaceholder ? getImage('loading.svg') : false"
        densities="1x"
        @error="showErrorImage = true"
    />
    <img v-else src="~/assets/images/no-image.png" alt="No image found" loading="lazy" />
</template>
