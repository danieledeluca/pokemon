<script setup lang="ts">
const route = useRoute();
const setId = route.params.id;

const { data: set, pending, error } = useLazyFetch(`/api/sets/${setId}`);

useSeoMeta({
    title: () => set.value?.name,
    description: () => `Browse every card from the ${set.value?.name} set.`,
});

const name = ref(getQueryValue('name'));

const setCards = computed(() => {
    return set.value?.cards.filter((card) => card.name.toLowerCase().includes(name.value.trim().toLowerCase())) || [];
});
</script>

<template>
    <template v-if="pending">
        <USkeleton class="h-48 w-full" />
        <USkeleton class="my-4 h-8 w-full sm:my-6 lg:my-8" />
        <div class="list-grid">
            <div v-for="n in 20" :key="n">
                <USkeleton class="aspect-card-low" />
                <USkeleton class="list-title h-6" />
            </div>
        </div>
    </template>
    <UAlert v-else-if="error" color="error" :title="error.message" />
    <template v-else-if="set">
        <TcgSetData :set />
        <div class="my-4 sm:my-6 lg:my-8">
            <UInput
                v-model="name"
                class="w-full"
                icon="i-lucide-search"
                placeholder="Search for a card"
                @update:modelValue="(value) => setQueryValue('name', value)"
            />
        </div>
        <div v-if="setCards.length > 0" class="list-grid">
            <TcgCard v-for="card in setCards" :key="card.id" :card />
        </div>
        <UAlert v-else color="warning" :title="`No cards fond for: ${name}`" />
    </template>
</template>
