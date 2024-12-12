<script setup lang="ts">
import { isInViewport } from '@/utils';
import { useWindowScroll } from '@vueuse/core';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const { y } = useWindowScroll();

const header = ref<HTMLElement>();
const searchForm = ref<HTMLElement>();
const isSearchFormSticky = ref(false);

function focusFirstInput() {
    searchForm.value?.querySelector('input')?.focus();
}

function hideSearchForm() {
    searchForm.value?.style.removeProperty('--header-height');
    isSearchFormSticky.value = false;
}

function showSearchForm() {
    searchForm.value = document.querySelector('.search-form') as HTMLElement;

    if (searchForm.value) {
        if (isSearchFormSticky.value) {
            hideSearchForm();

            return;
        }

        if (isInViewport(searchForm.value, y.value, header.value!)) {
            focusFirstInput();
        } else {
            searchForm.value.style.setProperty(
                '--header-height',
                `${header.value?.offsetHeight || 0}px`
            );
            isSearchFormSticky.value = true;

            setTimeout(() => {
                focusFirstInput();
            }, 300);
        }
    }
}

watch(y, (newY) => {
    if (newY === 0) {
        hideSearchForm();
    }
});
</script>

<template>
    <header class="header" ref="header">
        <div class="container">
            <nav>
                <ul>
                    <li>
                        <RouterLink to="/">
                            <strong>Pokémon</strong>
                        </RouterLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <RouterLink :to="{ name: 'sets' }">
                            <span>Sets</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'cards' }">
                            <span>Cards</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'sprites' }">
                            <span>Sprites</span>
                        </RouterLink>
                    </li>
                    <li v-if="!['home', 'card'].includes($route.name as string)">
                        <button @click="showSearchForm" type="button" class="primary">
                            <span>Search</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    position: sticky;
    top: 0;
    background-color: var(--pico-background-color);
    border-bottom: 1px solid var(--pico-muted-border-color);
    z-index: 2;
}
</style>
