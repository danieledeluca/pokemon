<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Pokémon` : 'Pokémon';
    },
});
</script>

<template>
    <NuxtLoadingIndicator />
    <AppHeader />
    <div class="page-wrapper container">
        <NuxtPage />
    </div>
    <AppFooter />
</template>
