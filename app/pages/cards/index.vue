<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';

useSeoMeta({
    title: 'TCG Cards',
    description: 'A list of all Pokémon TCG cards.',
});

const defaultState: CardsFilters = {
    name: undefined,
    type: undefined,
    retreat: undefined,
    illustrator: undefined,
    hp: undefined,
    category: undefined,
    energyType: undefined,
    regulationMark: undefined,
    stage: undefined,
    suffix: undefined,
    trainerType: undefined,
};
const { state } = useQueryState(CardsFiltersSchema, defaultState, true);
const { data: cardsGroups, pending, error } = useLazyFetch('/api/cards', { query: state });
const cardsFiltersStore = useCardsFilters();

const hasActiveFilters = computed(() => {
    const { name, ...rest } = state;

    return Object.values(rest).some(Boolean);
});

const handleUpdate = useDebounceFn((value?: string) => {
    state.name = value;
}, 300);

function handleClearFIlters(callback: () => void) {
    const { name, ...rest } = state;

    if (Object.values(rest).some((value) => value)) {
        Object.assign(state, defaultState);
    }

    callback();
}
</script>

<template>
    <div class="mb-4 flex flex-wrap gap-4 sm:mb-6 lg:mb-8">
        <UFieldGroup class="flex-1">
            <UInput
                :modelValue="state.name"
                class="w-full"
                icon="i-lucide-search"
                placeholder="Search for a card"
                :loading="pending"
                @update:modelValue="handleUpdate"
            />
            <UButton label="Search" />
        </UFieldGroup>
        <USlideover title="Filters" :ui="{ footer: 'justify-end' }">
            <UChip :show="hasActiveFilters">
                <UButton label="Filters" color="neutral" variant="subtle" />
            </UChip>
            <template #body>
                <TcgCardsFilters v-model:state="state" />
            </template>
            <template #footer="{ close }">
                <UButton
                    variant="outline"
                    color="neutral"
                    label="Clear all"
                    icon="i-lucide-funnel-x"
                    @click="handleClearFIlters(close)"
                />
                <UButton label="Close" @click="close" />
            </template>
        </USlideover>
        <template v-if="hasActiveFilters">
            <div class="flex min-w-0 basis-full flex-wrap gap-2">
                <template v-for="(value, key) in state" :key="key">
                    <UButton
                        v-if="key !== 'name' && value"
                        variant="soft"
                        color="neutral"
                        size="sm"
                        :label="`${cardsFiltersStore.filtersLabels[key]}: ${value}`"
                        trailingIcon="i-lucide-x"
                        class="min-w-0 truncate"
                        @click="state[key] = undefined"
                    />
                </template>
            </div>
        </template>
    </div>
    <template v-if="pending && !cardsGroups">
        <div class="list-grid">
            <div v-for="n in 20" :key="n">
                <USkeleton class="aspect-card-low" />
                <USkeleton class="list-title h-6" />
            </div>
        </div>
        <div class="mt-4 flex items-center justify-center gap-1 sm:mt-6 lg:mt-6">
            <USkeleton v-for="n in 9" :key="n" class="size-8" />
        </div>
    </template>
    <AppError v-else-if="error" :error />
    <template v-else-if="cardsGroups">
        <TcgCardsList v-if="cardsGroups.length > 0" :cardsGroups />
        <AppWarning v-else title="No cards match your criteria" />
    </template>
</template>
