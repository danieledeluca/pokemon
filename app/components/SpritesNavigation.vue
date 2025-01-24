<script setup lang="ts">
import type { NamedAPIResourceList } from 'pokenode-ts';

const { sprites } = defineProps<{
    sprites: NamedAPIResourceList;
}>();

const route = useRoute();

const showPreviousButton = sprites.previous !== null;
const showNextButton = sprites.next !== null;

const previousOffset = showPreviousButton
    ? new URLSearchParams(new URL(sprites.previous || '').search).get('offset')
    : '';
const nextOffset = showNextButton
    ? new URLSearchParams(new URL(sprites.next || '').search).get('offset')
    : '';
</script>

<template>
    <div v-if="showPreviousButton || showNextButton" class="navigation-wrap">
        <div class="navigation" role="group">
            <button v-if="!showPreviousButton" type="button" class="secondary" disabled>
                <span>Previous</span>
            </button>
            <NuxtLink
                v-else
                :to="{ name: 'sprites', query: { ...route.query, offset: previousOffset } }"
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
                :to="{ name: 'sprites', query: { ...route.query, offset: nextOffset } }"
                role="button"
                class="secondary"
                :external="true"
            >
                <span>Next</span>
            </NuxtLink>
        </div>
    </div>
</template>
