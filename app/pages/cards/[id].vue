<script setup lang="ts">
const route = useRoute();
const { data: card, error } = await useFetch(`/api/cards/${route.params.id}`);

if (error.value || !card.value) {
    throw createError({
        statusCode: error.value?.statusCode || 404,
        statusMessage: error.value?.message || 'Card not found',
    });
}

const { headerHeight } = useHeader();

useSeoMeta({
    title: card.value?.name,
    description: `${card.value?.name} from ${card.value?.set.name}`,
});
</script>

<template>
    <div v-if="card" class="detail card">
        <aside :style="`--header-height: ${headerHeight}px;`">
            <div class="image">
                <img :src="card.images.large" :alt="card.name" />
            </div>
            <CardNavigation :card="card" />
        </aside>
        <CardData :card="card" />
    </div>
</template>
