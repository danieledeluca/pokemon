<script setup lang="ts">
import { getImageUrl } from '@/composables/utils';

const boxes = [
    {
        name: 'sets',
        title: 'Pokèmon sets',
        content: 'A list of all Pokèmon sets released and all their cards with all details.',
    },
    {
        name: 'cards',
        title: 'Pokèmon cards',
        content: 'A list of all Pokèmon cards released and all their details.',
    },
    {
        name: 'sprites',
        title: 'Pokèmon sprites',
        content: 'A list of all Pokèmon sprites released and all their details.',
    },
];
</script>

<template>
    <div class="container">
        <div class="hero">
            <div class="hero-background">
                <img src="@/assets/pokemon-logo.svg" alt="Pokèmon" />
            </div>
        </div>
        <div class="grid">
            <RouterLink v-for="box in boxes" :to="{ name: box.name }" :key="box.name" class="box">
                <span class="icon">
                    <img :src="getImageUrl(`icons/${box.name}.png`)" :alt="box.title" />
                </span>
                <h6 class="title">{{ box.title }}</h6>
                <div class="content">{{ box.content }}</div>
            </RouterLink>
        </div>
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
    --pico-color: #373c44;

    text-decoration: none;
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
    --pico-color: inherit;

    margin-bottom: 0.25rem;
}

.box .content {
    --color: var(--pico-muted-color);

    color: var(--color);
}

@media (min-width: 768px) {
    .hero-background {
        flex-basis: 40%;
    }

    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (prefers-color-scheme: dark) {
    .box {
        --pico-color: #c2c7d0;
    }

    .box .icon {
        --background-color: var(--pico-secondary-background);
    }
}
</style>
