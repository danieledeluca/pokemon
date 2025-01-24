<script setup lang="ts">
const route = useRoute();
const { data: card } = await useFetch(`/api/cards/${route.params.id}`);

if (!card.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Card not found',
    });
}

const { headerHeight } = useHeader();

useSeoMeta({
    title: card.value?.name,
    description: `${card.value?.name} from ${card.value?.set.name}`,
});
</script>

<template>
    <div v-if="card" class="card">
        <aside :style="`--header-height: ${headerHeight}px;`">
            <div class="image">
                <img :src="card.images.large" :alt="card.name" />
            </div>
            <CardNavigation :card="card" />
        </aside>
        <CardData :card="card" />
    </div>
</template>

<style scoped>
.card {
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1rem;
}

@media (min-width: 768px) {
    .card {
        grid-template-columns: 1fr 2fr;
    }

    aside {
        position: sticky;
        top: calc(var(--header-height) + 1rem);
    }
}
</style>
