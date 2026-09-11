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
    <UTooltip
        :text="type"
        class="inline-block"
        :disabled="!showTooltip"
        :content="{
            side: 'top',
        }"
    >
        <NuxtImg
            :src="`/card-types/${type.toLowerCase()}.png`"
            :alt="type"
            :class="{
                'size-6': size === 'small',
                'size-10': size === 'large',
            }"
        />
    </UTooltip>
</template>
