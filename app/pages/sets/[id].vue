<script setup lang="ts">
const route = useRoute();
const { data: set, pending, error } = useLazyFetch(`/api/sets/${route.params.id}`);

useSeoMeta({
    title: () => set.value?.name,
    description: () => `Browse every card from the ${set.value?.name} set.`,
});

const { state, debouncedState } = useQueryState(BaseStateSchema, { name: undefined });

const setCards = computed(() => {
    return set.value?.cards.filter((card) => {
        return card.name.toLowerCase().includes(debouncedState.value.name?.trim().toLowerCase() || '');
    }) || [];
});
</script>

<template>
    <template v-if="pending">
        <div class="flex gap-4 max-md:flex-col sm:gap-6">
            <USkeleton class="h-55 md:flex-1" />
            <USkeleton class="h-55 md:flex-2" />
        </div>
        <USkeleton class="my-4 h-8 w-full sm:my-6 lg:my-8" />
        <div class="list-grid">
            <div v-for="n in 20" :key="n">
                <USkeleton class="aspect-card-low" />
                <USkeleton class="list-title h-6" />
            </div>
        </div>
    </template>
    <AppError v-else-if="error" :error />
    <template v-else-if="set">
        <TcgSetData :set />
        <div class="my-4 sm:my-6 lg:my-8">
            <UInput
                v-model="state.name"
                class="w-full"
                icon="i-lucide-search"
                placeholder="Search for a card"
            />
        </div>
        <div v-if="setCards.length > 0" class="list-grid">
            <TcgCard v-for="card in setCards" :key="card.id" :card />
        </div>
        <AppWarning v-else :title="`No cards fond for: ${debouncedState.name}`" />
    </template>
</template>
