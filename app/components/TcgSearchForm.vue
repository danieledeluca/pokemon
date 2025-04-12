<script setup lang="ts" generic="T extends object">
const { sorterOptions, placeholder = 'Search for a card' } = defineProps<{
    sorterOptions?: TCGSortersOptions<T>;
    placeholder?: string;
}>();

const filters = defineModel<TCGFilters>('filters', { required: true });
const sorters = defineModel<TCGSorters<T>>('sorters');

const searchForm = ref<HTMLFormElement | null>(null);

if (sorters.value) {
    watch(sorters.value, () => {
        setTimeout(() => searchForm.value?.submit());
    });
}
</script>

<template>
    <form ref="searchForm" role="search">
        <input v-model="filters.name" type="search" name="name" :placeholder />
        <template v-if="sorterOptions">
            <input
                v-for="(value, key) in sorters"
                :key="key"
                type="hidden"
                :name="key.toString()"
                :value="value"
            />
        </template>
        <button type="submit">
            <span>Search</span>
        </button>
    </form>
    <form v-if="sorterOptions && sorters">
        <label for="order">Sort by</label>
        <div role="group" class="sorters">
            <select id="order" v-model="sorters.order" name="order">
                <option v-for="order in sorterOptions.order" :key="order" :value="order">
                    {{ TCGSortersOrderLabels[order as keyof typeof TCGSortersOrderLabels] }}
                </option>
            </select>
            <select v-model="sorters.direction" name="direction">
                <option
                    v-for="direction in sorterOptions.direction"
                    :key="direction"
                    :value="direction"
                >
                    {{ TCGSortersDirectionLabels[direction] }}
                </option>
            </select>
        </div>
    </form>
</template>

<style scoped>
[role='group'] {
    margin-bottom: 0;
}

[name='direction'] {
    width: auto;
}
</style>
