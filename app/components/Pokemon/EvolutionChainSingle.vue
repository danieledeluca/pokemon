<script setup lang="ts">
const { evolutionChain } = defineProps<{
    evolutionChain: PokemonEvolutionChain;
}>();
</script>

<template>
    <div class="evolution">
        <NuxtLink
            :to="`/pokemon/${getIdFromUrl(evolutionChain.url)}`"
            class="image"
            :data-tooltip="parseName(evolutionChain.name)"
        >
            <AppImage
                :src="getPokemonSprites(evolutionChain.url)['front-default']"
                :alt="evolutionChain.name"
            />
        </NuxtLink>
        <div class="name">
            <span>{{ parseName(evolutionChain.name) }}</span>
        </div>
    </div>
</template>

<style scoped>
.evolution:has(+ :is(.evolution, .split)) {
    position: relative;
}

.evolution:has(+ :is(.evolution, .split))::after {
    content: '>';
    position: absolute;
    top: 50%;
    right: 0;
    display: inline-block;
    width: 1rem;
    aspect-ratio: 1;
    translate: 100% -50%;
    font-size: 0.625rem;
    text-align: center;
}
</style>
