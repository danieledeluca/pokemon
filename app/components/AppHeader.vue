<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <header>
        <nav class="container">
            <ul>
                <li>
                    <NuxtLink to="/">Pokémon</NuxtLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NuxtLink to="/sets" :external="route.name === 'sets'">Sets</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/cards" :external="route.name === 'cards'">Cards</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/sprites" :external="route.name === 'sprites'">Sprites</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: sticky;
    top: 0;
    background-color: color-mix(in srgb, var(--pico-background-color) 50%, transparent);
    border-bottom: 1px solid var(--pico-muted-border-color);
    backdrop-filter: blur(20px);
    z-index: 2;
}
</style>
