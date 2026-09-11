<script setup lang="ts">
const route = useRoute();
const cardId = route.params.id;

const { data: card, pending, error } = useLazyFetch(`/api/cards/${cardId}`);

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
                <USkeleton class="h-48 w-full" />
                <USkeleton class="h-48 w-full" />
            </div>
        </div>
    </template>
    <UAlert v-else-if="error" color="error" :title="error.message" />
    <template v-else-if="card">
        <div class="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <div>
                <div class="flex aspect-card-high items-center justify-center">
                    <AppImage
                        :src="card.image ? `${card.image}/high.png` : undefined"
                        :alt="card.name"
                        class="w-full"
                        placeholder="/card-back-high.png"
                        errorClass="p-4 sm:p-6"
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
