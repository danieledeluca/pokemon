<script setup lang="ts">
import CardData from '@/components/CardData.vue';
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const cardId = route.params.card_id as string;

const pokemonStore = usePokemonStore();
const pokemonCard = computed(() => pokemonStore.pokemonCards);

const setId = computed(() => pokemonCard.value.data[cardId]?.set.id);
const setCards = computed(() => pokemonStore.pokemonCardsBySet.data[setId.value]);
const cardIndex = computed(() => setCards.value?.findIndex((card) => card.id === cardId));

onMounted(async () => {
    if (!pokemonCard.value.data[cardId]) {
        await pokemonStore.getPokemonCard(cardId);
    }

    if (!setCards.value?.length) {
        await pokemonStore.getPokemonCardsBySet(setId.value);
    }
});
</script>

<template>
    <div v-if="pokemonCard.responseStatus.ok && pokemonCard.data[cardId]" class="card">
        <div class="card-image">
            <img :src="pokemonCard.data[cardId].images.large" :alt="pokemonCard.data[cardId].name" loading="lazy" />
            <div class="card-navigation">
                <RouterLink
                    v-if="cardIndex > 0"
                    :to="{ name: 'card', params: { card_id: setCards[cardIndex - 1].id } }"
                    role="button"
                    class="secondary"
                >
                    <span>Prev</span>
                </RouterLink>
                <RouterLink
                    v-if="setCards && setCards.length > cardIndex + 1"
                    :to="{ name: 'card', params: { card_id: setCards[cardIndex + 1].id } }"
                    role="button"
                    class="secondary"
                >
                    <span>Next</span>
                </RouterLink>
            </div>
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

.card-navigation {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.card-navigation a {
    flex: 1;
}

@media (min-width: 768px) {
    .card {
        grid-template-columns: 1fr 2fr;
    }

    .card-image {
        position: sticky;
        top: calc(70.8px + 1rem);
    }
}
</style>
