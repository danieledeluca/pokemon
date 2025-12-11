<script setup lang="ts">
const { card } = defineProps<{
    card: TcgCard;
}>();

const { data: set } = await useLazyFetch(`/api/sets/${card.set.id}`);

const cards = computed(() => set.value?.cards);
const cardIndex = computed(() => cards.value?.findIndex((_card) => _card.id === card.id) || 0);

const showPreviousButton = computed(() => cardIndex.value > 0);
const showNextButton = computed(() => cardIndex.value < card.set.cardCount.total - 1);

const previousCardId = computed(() => cards.value?.[cardIndex.value - 1]?.id);
const nextCardId = computed(() => cards.value?.[cardIndex.value + 1]?.id);

const showNavigation = computed(
    () =>
        (showPreviousButton.value || showNextButton.value) &&
        (previousCardId.value || nextCardId.value),
);
</script>

<template>
    <div v-if="showNavigation" class="navigation" role="group">
        <button v-if="!showPreviousButton" type="button" class="secondary" disabled>
            <span>Previous</span>
        </button>
        <NuxtLink v-else :to="`/cards/${previousCardId}`" role="button" class="secondary">
            <span>Previous</span>
        </NuxtLink>
        <button v-if="!showNextButton" type="button" class="secondary" disabled>
            <span>Next</span>
        </button>
        <NuxtLink v-else :to="`/cards/${nextCardId}`" role="button" class="secondary">
            <span>Next</span>
        </NuxtLink>
    </div>
</template>
