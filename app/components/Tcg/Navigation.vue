<script setup lang="ts">
import type { Card } from '@tcgdex/sdk';

const { card } = defineProps<{
    card: Card;
}>();

const { data: set, pending, error } = useLazyFetch(`/api/sets/${card.set.id}`);

const currentCardIndex = computed(() => set.value?.cards.findIndex((setCard) => setCard.id === card.id) || 0);

const firstSetCardId = computed(() => set.value?.cards.at(0)?.id);
const lastSetCardId = computed(() => set.value?.cards.at(-1)?.id);

const previousCardId = computed(() => set.value?.cards.at(currentCardIndex.value - 1)?.id);
const nextCardId = computed(() => set.value?.cards.at(currentCardIndex.value + 1)?.id);
</script>

<template>
    <UFieldGroup v-if="!error" class="w-full">
        <UButton
            :loading="pending"
            :disabled="card.id === firstSetCardId"
            :to="`/cards/${previousCardId}`"
            label="Previous"
            block
        />
        <UButton
            :loading="pending"
            :disabled="card.id === lastSetCardId"
            :to="`/cards/${nextCardId}`"
            label="Next"
            block
        />
    </UFieldGroup>
</template>
