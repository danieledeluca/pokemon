<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { computed, onMounted } from 'vue';
import LoadingState from '@/components/LoadingState.vue';
import CardData from '@/components/CardData.vue';
import Message from '@/components/Message.vue';

const route = useRoute();
const cardId = route.params.card_id as string;

const pokemonStore = usePokemonStore();
const pokemonCard = computed(() => pokemonStore.pokemonCards);

onMounted(async () => {
    if (!pokemonCard.value.data[cardId]) {
        await pokemonStore.getPokemonCard(cardId);
    }
});
</script>

<template>
    <div v-if="pokemonCard.responseStatus.ok && pokemonCard.data[cardId]" class="card">
        <div class="card-image">
            <img :src="pokemonCard.data[cardId]?.images.large" :alt="pokemonCard.data[cardId]?.name" loading="lazy" />
        </div>
        <CardData :pokemon-card="pokemonCard.data[cardId]" />
    </div>
    <Message v-if="pokemonCard.responseStatus.error" type="error" :text="pokemonCard.responseStatus.error" />
    <LoadingState :response-status="pokemonCard.responseStatus" />
</template>

<style scoped>
.card {
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1rem;
}

.card-image img {
    width: 100%;
}

@media (min-width: 768px) {
    .card {
        grid-template-columns: 1fr 2fr;
    }

    .card-image {
        position: sticky;
        top: calc(98px + 1rem);
    }
}
</style>
