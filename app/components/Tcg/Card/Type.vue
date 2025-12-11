<script setup lang="ts">
const {
    type,
    size,
    showTooltip = true,
} = defineProps<{
    type: string;
    size: 'small' | 'large';
    showTooltip?: boolean;
}>();
</script>

<template>
    <span :data-tooltip="showTooltip ? type : null">
        <img :src="getImage(`card-types/${type.toLowerCase()}.png`)" :alt="type" :class="size" />
    </span>
</template>

<style scoped>
span {
    display: inline-block;
}

img {
    display: block;
}

img.small {
    width: 1rem;
}

img.large {
    width: 2rem;
}
</style>
