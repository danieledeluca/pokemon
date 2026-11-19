<script setup lang="ts">
const state = defineModel<CardsFilters>('state', { required: true });
const cardsFiltersStore = useCardsFilters();

const { filtersFields } = storeToRefs(cardsFiltersStore);

function handleUpdate<K extends keyof CardsFilters>(field: K, value: CardsFilters[K]) {
    state.value[field] = value;
}
</script>

<template>
    <div class="space-y-4">
        <UFormField v-for="field in filtersFields" :key="field.formFieldProps.name" v-bind="field.formFieldProps">
            <div class="flex gap-2">
                <!-- eslint-disable style/max-len -->
                <USelectMenu
                    :modelValue="state[field.formFieldProps.name]"
                    v-bind="field.selectMenuProps"
                    class="w-full min-w-0"
                    clear
                    @update:modelValue="handleUpdate(field.formFieldProps.name, $event as CardsFilters[typeof field.formFieldProps.name])"
                />
                <!-- eslint-enable style/max-len -->
            </div>
        </UFormField>
    </div>
</template>
