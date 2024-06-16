<script setup lang="ts">
const props = defineProps<{
    text: string;
}>();
</script>

<template>
    <small class="tooltip">{{ props.text }}</small>
</template>

<style scoped>
:global(*:has(> .tooltip)) {
    position: relative;
}

:global(*:has(> .tooltip):hover .tooltip) {
    top: 0;
    visibility: visible;
    opacity: 1;
}

.tooltip {
    position: absolute;
    top: 15%;
    left: 50%;
    display: inline-block;
    padding: 0.125rem 0.25rem;
    background-color: var(--pico-secondary-background);
    border-radius: var(--pico-border-radius);
    white-space: nowrap;
    translate: -50% calc(-100% - 0.5rem);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-in-out;
}
</style>
