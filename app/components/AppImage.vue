<script setup lang="ts">
const { src, alt } = defineProps<{
    src: string;
    alt: string;
}>();

const showErrorImage = ref(false);
</script>

<template>
    <NuxtImg
        v-if="!showErrorImage"
        :src="src"
        :alt="alt"
        :placeholder="getImage('loading.svg')"
        densities="1x"
        @error="showErrorImage = true"
    />
    <img v-else src="~/assets/images/no-image.png" alt="No image found" loading="lazy" />
</template>
