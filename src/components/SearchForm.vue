<script setup lang="ts">
import { getSearchParam, setSearchParam } from '@/composables/utils';
import { ref, watch } from 'vue';

const props = defineProps<{
    name: string;
    isDisabled: boolean;
}>();

const emit = defineEmits<{
    updateFilter: [filter: string];
}>();

const filter = ref(getSearchParam('name'));

watch(
    filter,
    (newFilter) => {
        setSearchParam('name', newFilter);
        emit('updateFilter', newFilter);
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <div class="search-form">
        <form @submit.prevent>
            <fieldset :disabled="props.isDisabled">
                <label>
                    Search a {{ props.name }}
                    <input type="text" name="set" v-model="filter" />
                </label>
            </fieldset>
            <slot></slot>
        </form>
    </div>
</template>

<style scoped>
.search-form {
    position: sticky;
    top: calc(var(--header-height, -100%) - 1px);
    padding-top: 1rem;
    background-color: var(--pico-background-color);
    transition: top 0.3s ease-in-out;
    z-index: 1;
}
</style>
