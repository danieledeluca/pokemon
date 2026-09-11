<script setup lang="ts">
import mediumZoom from 'medium-zoom';

const { src, alt, placeholder, errorSrc = '/no-image.png', errorClass, allowZoom = false } = defineProps<{
    src?: string;
    alt?: string;
    placeholder?: string;
    errorSrc?: string;
    errorClass?: string;
    allowZoom?: boolean;
}>();

const showErrorImage = ref(false);

watch(() => src, () => {
    showErrorImage.value = false;
});

onMounted(() => {
    if (allowZoom) {
        mediumZoom('[data-zoomable="true"]', {
            background: 'color-mix(in srgb, var(--ui-bg) 80%,transparent)',
        });
    }
});
</script>

<template>
    <NuxtImg
        v-if="src && !showErrorImage"
        :key="src"
        :src="src"
        :alt
        :placeholder
        densities="1x"
        loading="lazy"
        :data-zoomable="allowZoom || undefined"
        @error="showErrorImage = true"
    />
    <NuxtImg
        v-else
        :src="errorSrc"
        alt="No image available"
        densities="1x"
        class="w-full object-contain"
        :class="errorClass"
    />
</template>
