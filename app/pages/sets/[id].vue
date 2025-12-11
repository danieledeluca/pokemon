<script setup lang="ts">
import type { Set } from '@tcgdex/sdk';

const route = useRoute();
const setId = route.params.id;

const { filters, query } = useTcgFilters<Set>();
const { data: set, error, status } = await useLazyFetch(`/api/sets/${setId}`, { query });

useSeoMeta({
    title: () => set.value?.name,
    description: () => `A list of all Pokémon TCG cards in the ${set.value?.name} set`,
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="set" />
    <AppMessage
        v-if="status === 'error' && error"
        type="error"
        :text="error.statusMessage || error.message"
    />
    <template v-if="status === 'success'">
        <article v-if="set" class="set">
            <div class="logo">
                <AppImage :src="`${set.logo}.png`" :alt="set.name" />
            </div>
            <div class="content">
                <p>
                    <strong>Name: </strong>{{ set.name }}
                    <img
                        v-if="set.symbol"
                        class="symbol"
                        :src="`${set.symbol}.png`"
                        :alt="set.name"
                    />
                </p>
                <p><strong>Serie: </strong>{{ set.serie.name }}</p>
                <p><strong>Release date: </strong>{{ formatDate(set.releaseDate) }}</p>
                <p><strong>Total cards: </strong>{{ set.cardCount.total }}</p>
            </div>
        </article>
        <TcgSearchForm v-model:filters="filters" />
        <TcgCardsGrid v-if="set?.cards.length" :cards="set.cards" />
        <AppMessage
            v-else
            text="We couldn't find any cards matching your search criteria"
            type="warning"
        />
    </template>
</template>

<style scoped>
.set {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
}

.set p:last-child {
    margin-bottom: 0;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo img {
    max-width: 80%;
    max-height: 80%;
}

.content {
    align-self: center;
}

.symbol {
    width: 1.5rem;
    margin-left: 0.5rem;
}

@media (min-width: 768px) {
    .set {
        grid-template-columns: 1fr 2fr;
    }
}
</style>
