<script setup lang="ts">
const { total, itemsPerPage = PAGINATION_ITEM_PER_PAGE } = defineProps<{
    total: number;
    itemsPerPage?: number;
}>();

const { getQueryValue, setQueryValue } = useQuery();

const page = computed({
    get: () => Number(getQueryValue('page') || 1),
    set: (value) => {
        setQueryValue('page', value === 1
            ? undefined
            : value.toString());
    },
});
</script>

<template>
    <UPagination
        v-model:page="page"
        :total
        :itemsPerPage
        class="mt-4 sm:mt-6 lg:mt-8"
        :ui="{ list: 'justify-center' }"
    />
</template>
