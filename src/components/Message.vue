<script setup lang="ts">
const props = defineProps<{
    type: 'error';
    text: string;
}>();
</script>

<template>
    <div class="message" :class="`message-${props.type}`" v-html="props.text"></div>
</template>

<style scoped>
.message {
    padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);
    border-radius: var(--pico-border-radius);
}

.message-error {
    --pico-color: var(--pico-contrast-inverse);

    background-color: var(--pico-del-color);
    color: var(--pico-color);
}
</style>
