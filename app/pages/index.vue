<script setup lang="ts">
const boxes = [
    {
        name: 'sets',
        title: 'Pokémon sets',
        content: 'A list of all Pokémon TCG sets released.',
    },
    {
        name: 'cards',
        title: 'Pokémon cards',
        content: 'A list of all Pokémon TCG cards released.',
    },
    {
        name: 'sprites',
        title: 'Pokémon sprites',
        content: 'A list of all Pokémon sprites released.',
    },
];
</script>

<template>
    <div class="hero">
        <div class="hero-background">
            <img src="~/assets/images/pokemon-logo.svg" alt="Pokémon" />
        </div>
    </div>
    <div class="grid">
        <NuxtLink v-for="box in boxes" :key="box.name" :to="{ name: box.name }" class="box">
            <span class="icon">
                <img :src="getImage(`icons/${box.name}.png`)" :alt="box.title" />
            </span>
            <h6 class="title">{{ box.title }}</h6>
            <div class="content">
                {{ box.content }}
            </div>
        </NuxtLink>
    </div>
</template>

<style scoped>
.hero {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 4rem 6rem;
}

.hero-background {
    flex-basis: 80%;
    position: relative;
    padding: 1.5rem;
}

.hero-background::before {
    content: '';
    position: absolute;
    top: 6%;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(50, 104, 176, 1) 50%, rgba(255, 203, 5, 1) 50%);
    border-radius: 50%;
    filter: blur(2.5rem);
    opacity: 0.7;
    z-index: -1;
}

.hero img {
    width: 100%;
}

.grid {
    grid-template-columns: 1fr;
    gap: 1rem;
}

.box {
    padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);
    background-color: var(--pico-card-background-color);
    border: 1px solid var(--pico-card-border-color);
    border-radius: var(--pico-border-radius);
    text-decoration: none;
}

.box:not(:focus-visible) {
    box-shadow: var(--pico-card-box-shadow);
}

.box:hover {
    background-color: var(--pico-card-sectioning-background-color);
}

.box .icon {
    --background-color: var(--pico-muted-border-color);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 3em;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: var(--background-color);
    border: 1px solid var(--pico-card-border-color);
    border-radius: var(--pico-border-radius);
    aspect-ratio: 1;
}

.box .icon img {
    height: 100%;
}

.box .title {
    margin-bottom: 0.25rem;
}

.box .content {
    color: var(--pico-muted-color);
}

@media (min-width: 768px) {
    .hero-background {
        flex-basis: 40%;
    }

    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
