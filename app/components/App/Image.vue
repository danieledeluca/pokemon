<script setup lang="ts">
import mediumZoom from 'medium-zoom';

const {
    src,
    alt,
    showPlaceholder = true,
    allowZoom = false,
} = defineProps<{
    src: string;
    alt: string;
    showPlaceholder?: boolean;
    allowZoom?: boolean;
}>();

const showErrorImage = ref(false);

onMounted(() => {
    if (allowZoom) {
        mediumZoom('[data-nuxt-img]', {
            background: 'color-mix(in srgb, var(--pico-background-color) 80%,transparent)',
        });
    }
});
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
