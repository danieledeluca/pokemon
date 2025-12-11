<script setup lang="ts">
import type { CardResume } from '@tcgdex/sdk';

const { filters, query } = useTcgFilters<CardResume>();
const { data: cards, error, status } = await useLazyFetch('/api/cards', { query });

useSeoMeta({
    title: 'Cards',
    description: 'A list of all Pokémon TCG cards',
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="cards" />
    <AppMessage
        v-if="status === 'error' && error"
        type="error"
        :text="error.statusMessage || error.message"
    />
    <template v-if="status === 'success'">
        <TcgSearchForm v-model:filters="filters" />
        <template v-if="cards?.length">
            <TcgCardsGrid :cards="cards" />
            <TcgCardsNavigation :query="query" />
        </template>
        <AppMessage
            v-else
            text="We couldn't find any cards matching your search criteria"
            type="warning"
        />
    </template>
</template>
