<script setup lang="ts">
import type { CardResume } from '@tcgdex/sdk';

const { cardsGroups } = defineProps<{
    cardsGroups: CardResume[][];
}>();

const { getQueryValue } = useQuery();
</script>

<template>
    <template v-for="(cards, index) in cardsGroups" :key="index">
        <div v-if="index + 1 === Number(getQueryValue('page') || 1)" class="list-grid">
            <TcgCard v-for="card in cards" :key="card.id" :card />
        </div>
    </template>
    <AppPagination v-if="cardsGroups.length > 1" :total="cardsGroups.flat().length" />
</template>
