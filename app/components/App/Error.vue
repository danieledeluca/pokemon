<script setup lang="ts">
import type { NuxtError } from '#app';

const { error } = defineProps <{
    error: NuxtError;
}>();
</script>

<template>
    <UAlert color="error" icon="i-lucide-circle-x" :title="getFetchErrorMessage(error)" />
</template>
