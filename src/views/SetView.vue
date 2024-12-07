<script setup lang="ts">
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import PokemonCards from '@/components/PokemonCards.vue';
import SearchForm from '@/components/SearchForm.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getSearchParam } from '@/utils';
import type { PokemonCard } from '@/utils/models';
import { filterList } from '@/utils/pokemon';
import { useDebounceFn } from '@vueuse/core';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

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
        :isDisabled="pokemonCards.responseStatus.isLoading || !!pokemonCards.responseStatus.error"
        @updateFilter="handleUpdateFilter"
    >
        <!-- TODO: add more filters -->
    </SearchForm>
    <template v-if="pokemonCards.responseStatus.ok && pokemonCards.data[setId]?.length">
        <PokemonCards :pokemonCards="pokemonCards.data[setId]" :pokemonCardsFiltered="pokemonCardsFiltered" />
        <Message
            v-if="!pokemonCardsFiltered?.length && filters.name"
            type="error"
            :text="`No cards found for: <strong>${filters.name}</strong>`"
        />
    </template>
    <Message v-if="pokemonCards.responseStatus.error" type="error" :text="pokemonCards.responseStatus.error" />
    <LoadingState :responseStatus="pokemonCards.responseStatus" @loadMore="handleLoadMore" />
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
