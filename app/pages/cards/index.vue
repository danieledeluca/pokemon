<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import type { CardsSchema } from '#imports';

useSeoMeta({
    title: 'TCG Cards',
    description: 'A list of all Pokémon TCG cards.',
});

const state = reactive<CardsSchema>({
    name: getQueryValue('name'),
    page: Number(getQueryValue('page') || 1),
});

const { data: cardsGroups, pending, error, refresh } = useLazyFetch('/api/cards', {
    query: state,
    watch: false,
});

function handleSubmit(event: FormSubmitEvent<CardsSchema>) {
    if (pending.value) {
        return;
    }

    setQueryValues({
        ...event.data,
        page: undefined,
    });
    refresh();
}
</script>

<template>
    <UForm
        :schema="CardsSchema"
        :state
        class="mb-4 sm:mb-6 lg:mb-8"
        @submit="handleSubmit"
    >
        <UFieldGroup class="w-full">
            <UInput
                v-model="state.name"
                class="w-full"
                icon="i-lucide-search"
                placeholder="Search for a card"
            />
            <UButton type="submit" label="Search" />
        </UFieldGroup>
    </UForm>
    <template v-if="pending">
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
    <UAlert v-else-if="error" color="error" :title="error.message" />
    <template v-else-if="cardsGroups">
        <template v-if="cardsGroups.length > 0">
            <template v-for="(cards, index) in cardsGroups" :key="index">
                <div v-if="index + 1 === state.page" class="list-grid">
                    <TcgCard v-for="card in cards" :key="card.id" :card />
                </div>
            </template>
            <UPagination
                v-if="cardsGroups.length > 1"
                v-model:page="state.page"
                :total="cardsGroups.flat().length"
                :itemsPerPage="CARDS_PER_PAGE"
                class="mt-4 sm:mt-6 lg:mt-8"
                :ui="{
                    list: 'justify-center',
                }"
                @update:page="(value) => setQueryValue('page', value === 1 ? undefined : value.toString())"
            />
        </template>
        <UAlert v-else color="warning" :title="`No cards fond for: ${state.name}`" />
    </template>
</template>
