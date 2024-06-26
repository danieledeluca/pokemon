<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { computed, onMounted, reactive } from 'vue';
import LoadingState from '@/components/LoadingState.vue';
import SearchForm from '@/components/SearchForm.vue';
import PokemonCards from '@/components/PokemonCards.vue';
import Message from '@/components/Message.vue';
import { useDebounceFn } from '@vueuse/core';
import { filterList } from '@/composables/pokemon';
import type { PokemonCard } from '@/models';
import { getSearchParam } from '@/composables/utils';

const route = useRoute();
const setId = route.params.set_id as string;

const filters = reactive({
    name: getSearchParam('name'),
});

const pokemonStore = usePokemonStore();
const pokemonCards = computed(() => pokemonStore.pokemonCardsBySet);
const pokemonCardsFiltered = computed(() => filterList<PokemonCard>(filters.name, pokemonCards.value.data[setId]));

const handleUpdateFilter = useDebounceFn((newFilter: string) => {
    filters.name = newFilter;
}, 1000);

const handleLoadMore = async () => {
    await pokemonStore.getPokemonCardsBySet(setId, pokemonCards.value.responseStatus.nextUrl);
};

onMounted(async () => {
    if (!pokemonCards.value.data[setId]?.length) {
        await pokemonStore.getPokemonCardsBySet(setId);
    }
});
</script>

<template>
    <div class="set-image">
        <img :src="`https://images.pokemontcg.io/${setId}/logo.png`" :alt="setId" />
    </div>
    <SearchForm
        name="card"
        :is-disabled="pokemonCards.responseStatus.isLoading || !!pokemonCards.responseStatus.error"
        @update-filter="handleUpdateFilter"
    >
        <!-- TODO: add more filters -->
    </SearchForm>
    <template v-if="pokemonCards.responseStatus.ok && pokemonCards.data[setId]?.length">
        <PokemonCards :pokemon-cards="pokemonCards.data[setId]" :pokemon-cards-filtered="pokemonCardsFiltered" />
        <Message
            v-if="!pokemonCardsFiltered?.length && filters.name"
            type="error"
            :text="`No cards found for: <strong>${filters.name}</strong>`"
        />
    </template>
    <Message v-if="pokemonCards.responseStatus.error" type="error" :text="pokemonCards.responseStatus.error" />
    <LoadingState :response-status="pokemonCards.responseStatus" @load-more="handleLoadMore" />
</template>

<style scoped>
.set-image {
    margin-block: 1rem 2rem;
    text-align: center;
}

.set-image img {
    max-width: 200px;
}
</style>
