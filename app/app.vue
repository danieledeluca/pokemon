<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Pokémon Vault` : 'Pokémon Vault';
    },
});
</script>

<template>
    <Analytics />
    <NuxtLoadingIndicator />
    <AppHeader />
    <div class="page-wrapper container">
        <NuxtPage />
    </div>
    <AppFooter />
</template>
