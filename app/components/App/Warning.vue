<script setup lang="ts">
const { title } = defineProps <{
    title: string;
}>();
</script>

<template>
    <UAlert color="warning" icon="i-lucide-triangle-alert" :title />
</template>
