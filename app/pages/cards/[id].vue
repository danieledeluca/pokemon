<script setup lang="ts">
const route = useRoute();
const { data: card, pending, error } = useLazyFetch(`/api/cards/${route.params.id}`);

useSeoMeta({
    title: () => card.value?.name,
    description: () => `View details and artwork for ${card.value?.name}, a card from the ${card.value?.set.name} set.`,
});
</script>

<template>
    <template v-if="pending">
        <div class="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <div>
                <USkeleton class="aspect-card-high w-full" />
                <USkeleton class="mt-4 h-8 w-full sm:mt-6 lg:mt-8" />
            </div>
            <div class="space-y-4 sm:space-y-6 md:col-span-2 lg:space-y-8">
                <USkeleton class="h-96 w-full" />
                <USkeleton class="h-40 w-full" />
                <USkeleton class="h-48 w-full" />
            </div>
        </div>
    </template>
    <AppError v-else-if="error" :error />
    <template v-else-if="card">
        <div class="grid items-start gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <div class="sticky md:top-[calc(var(--ui-header-height)+var(--spacing)*6)] lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                <div class="flex aspect-card-high items-center justify-center">
                    <AppImage
                        :src="card.image ? `${card.image}/high.png` : undefined"
                        :alt="card.name"
                        class="w-full"
                        placeholder="/placeholders/card-back-high.png"
                        :allowZoom="true"
                    />
                </div>
                <div class="mt-4 sm:mt-6 lg:mt-8">
                    <TcgNavigation :card />
                </div>
            </div>
            <div class="md:col-span-2">
                <TcgCardData :card />
            </div>
        </div>
    </template>
</template>
