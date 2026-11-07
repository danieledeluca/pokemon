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
                    @update:modelValue="handleUpdate(field.formFieldProps.name, $event as CardsFilters[typeof field.formFieldProps.name])"
                />
                <!-- eslint-enable style/max-len -->
                <UButton
                    v-if="state[field.formFieldProps.name]"
                    icon="i-lucide-x"
                    variant="subtle"
                    color="error"
                    @click.stop="state[field.formFieldProps.name] = undefined"
                />
            </div>
        </UFormField>
    </div>
</template>
