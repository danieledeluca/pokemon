<script setup lang="ts">
const { nameFieldPlaceholder = 'Search for a card' } = defineProps<{
    nameFieldPlaceholder?: string;
    showAdditionalFilters?: boolean;
}>();

const filters = defineModel<TcgFilters>('filters', { required: true });
</script>

<template>
    <form>
        <fieldset role="search">
            <input
                v-model="filters.name"
                type="search"
                name="name"
                :placeholder="nameFieldPlaceholder"
            />
            <button type="submit">
                <span>Search</span>
            </button>
        </fieldset>
    </form>
</template>
