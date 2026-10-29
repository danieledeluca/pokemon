<script setup lang="ts">
useSeoMeta({
    title: 'TCG Cards',
    description: 'A list of all Pokémon TCG cards.',
});

const { state, debouncedState } = useQueryState(BaseStateSchema, { name: undefined });
const { data: cardsGroups, pending, error } = useLazyFetch('/api/cards', { query: debouncedState });
</script>

<template>
    <UFieldGroup class="mb-4 w-full sm:mb-6 lg:mb-8">
        <UInput
            v-model="state.name"
            class="w-full"
            icon="i-lucide-search"
            placeholder="Search for a card"
        />
        <UButton label="Search" :loading="pending" />
    </UFieldGroup>
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
    <AppError v-else-if="error" :error />
    <template v-else-if="cardsGroups">
        <TcgCardList v-if="cardsGroups.length > 0" :cardsGroups />
        <AppWarning v-else :title="`No cards fond for: ${debouncedState.name}`" />
    </template>
</template>
