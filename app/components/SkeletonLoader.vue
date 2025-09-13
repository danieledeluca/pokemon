<script setup lang="ts">
const { layout } = defineProps<{
    layout: 'sets' | 'set' | 'cards' | 'card';
}>();
</script>

<template>
    <template v-if="layout === 'sets'">
        <div class="skeleton search sets"></div>
        <div class="skeleton title"></div>
        <div class="pokemon-grid">
            <div v-for="m in 12" :key="m" class="set">
                <div class="skeleton image"></div>
                <div class="skeleton name"></div>
            </div>
        </div>
    </template>
    <template v-if="layout === 'set' || layout === 'cards'">
        <div v-if="layout === 'set'" class="skeleton set-banner"></div>
        <div class="skeleton search"></div>
        <div class="form">
            <div class="skeleton label"></div>
            <div class="skeleton input"></div>
        </div>
        <div class="pokemon-grid">
            <div v-for="m in 12" :key="m" class="card">
                <div class="skeleton image"></div>
                <div class="skeleton name"></div>
            </div>
        </div>
    </template>
    <template v-if="layout === 'card'">
        <div class="detail card">
            <div>
                <div class="skeleton image"></div>
                <div class="skeleton navigation"></div>
            </div>
            <div>
                <article class="skeleton basic"></article>
                <article class="skeleton attributes"></article>
                <article class="skeleton attacks"></article>
            </div>
        </div>
    </template>
</template>

<style scoped>
.skeleton {
    background-color: rgba(var(--skeleton-background-color), 0.1);
    border-radius: var(--pico-border-radius);
    animation: skeleton 2s ease-in-out 0.5s infinite;
}

.search {
    height: 65px;
    margin-bottom: 1rem;
    border-radius: 5rem;
}

.search.sets {
    margin-bottom: 2rem;
}

.title {
    height: 45px;
    max-width: 25%;
    margin-bottom: var(--pico-typography-spacing-vertical);
}

.pokemon-grid {
    margin-bottom: 4rem;
}

.name {
    max-width: 70%;
    height: 30px;
    margin-inline: auto;
}

.set-banner {
    height: 210px;
    margin-bottom: 2rem;
}

.form {
    margin-bottom: 2rem;
}

.label {
    height: 30px;
    max-width: 200px;
    margin-bottom: 0.375rem;
}

.input {
    height: 60px;
}

.navigation {
    height: 60px;
    margin-top: 1rem;
}

article.basic {
    height: 540px;
}

article.attributes {
    height: 130px;
}

article.attacks {
    height: 200px;
}

@keyframes skeleton {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
}
</style>
