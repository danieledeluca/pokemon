<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { cards } = defineProps<{
    cards: PokemonTCGResponse<PokemonTCG.Card>;
}>();

const route = useRoute();

const totalPages = Math.ceil((cards.totalCount || 1) / (cards.pageSize || 1));
const showPreviousButton = (cards.page || 1) > 1;
const showNextButton = (cards.page || 1) < totalPages;
</script>

<template>
    <div v-if="showPreviousButton || showNextButton" class="navigation-wrap">
        <div class="navigation" role="group">
            <button v-if="!showPreviousButton" type="button" class="secondary" disabled>
                <span>Previous</span>
            </button>
            <NuxtLink
                v-else
                :to="{ name: 'cards', query: { ...route.query, page: (cards.page || 1) - 1 } }"
                role="button"
                class="secondary"
                :external="true"
            >
                <span>Previous</span>
            </NuxtLink>
            <button v-if="!showNextButton" type="button" class="secondary" disabled>
                <span>Next</span>
            </button>
            <NuxtLink
                v-else
                :to="{ name: 'cards', query: { ...route.query, page: (cards.page || 1) + 1 } }"
                role="button"
                class="secondary"
                :external="true"
            >
                <span>Next</span>
            </NuxtLink>
        </div>
    </div>
</template>
