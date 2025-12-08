<script setup lang="ts">
const route = useRoute();
const { data: card, error, status } = await useLazyFetch(`/api/cards/${route.params.id}`);

const { headerHeight } = useHeader();

useSeoMeta({
    title: () => card.value?.name,
    description: () => `${card.value?.name} from ${card.value?.set.name}`,
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="card" />
    <AppMessage
        v-if="status === 'error' && error"
        type="error"
        :text="error.statusMessage || error.message"
    />
    <template v-if="status === 'success'">
        <div v-if="card" class="detail card">
            <aside :style="`--header-height: ${headerHeight}px;`">
                <div class="image">
                    <AppImage :src="`${card.image}/high.png`" :alt="card.name" />
                </div>
                <CardNavigation :card="card" />
            </aside>
            <CardData :card="card" />
        </div>
        <AppMessage v-else text="We couldn't find the card you are looking for" type="warning" />
    </template>
</template>
