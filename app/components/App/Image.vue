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
        v-if="src && !showErrorImage"
        :src
        :alt
        :placeholder="showPlaceholder ? getImage('loading.svg') : ''"
        densities="1x"
        @error="showErrorImage = true"
    />
    <img v-else src="~/assets/images/no-image.png" alt="No image available" loading="lazy" />
</template>
