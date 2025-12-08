<script setup lang="ts" generic="T extends object">
const { query } = defineProps<{
    query: TcgQuery<T>;
}>();

const route = useRoute();
const currentPage = Number(query['pagination:page']) || 1;

const { data: nextPageCards } = await useLazyFetch('/api/cards', {
    query: { ...query, 'pagination:page': currentPage + 1 },
});

const showPreviousButton = currentPage > 1;
const showNextButton = computed(() => (nextPageCards.value?.length || 0) > 0);
</script>

<template>
    <div v-if="showPreviousButton || showNextButton" class="navigation-wrap">
        <div class="navigation" role="group">
            <NuxtLink
                v-if="showPreviousButton"
                :to="{ name: 'cards', query: { ...route.query, page: currentPage - 1 } }"
                role="button"
                class="secondary"
                :external="true"
            >
                <span>Previous</span>
            </NuxtLink>
            <button v-else type="button" class="secondary" disabled>
                <span>Previous</span>
            </button>
            <NuxtLink
                v-if="showNextButton"
                :to="{ name: 'cards', query: { ...route.query, page: currentPage + 1 } }"
                role="button"
                class="secondary"
                :external="true"
            >
                <span>Next</span>
            </NuxtLink>
            <button v-else type="button" class="secondary" disabled>
                <span>Next</span>
            </button>
        </div>
    </div>
</template>
