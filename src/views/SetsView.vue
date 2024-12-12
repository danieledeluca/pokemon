<script setup lang="ts">
import LazyImage from '@/components/LazyImage.vue';
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import SearchForm from '@/components/SearchForm.vue';
import { usePokemonStore } from '@/stores/pokemon';
import type { PokemonSet } from '@/utils/models';
import { filterList, showItem } from '@/utils/pokemon';
import { useDebounceFn } from '@vueuse/core';
import { computed, onMounted, reactive } from 'vue';

const filters = reactive({
    name: '',
});

const pokemonStore = usePokemonStore();
const pokemonSets = computed(() => pokemonStore.pokemonSets);
const pokemonSetsFiltered = computed(() =>
    filterList<PokemonSet>(filters.name, pokemonSets.value.data)
);

const handleUpdateFilter = useDebounceFn((newFilter: string) => {
    filters.name = newFilter;
}, 1000);

const handleLoadMore = async () => {
    await pokemonStore.getPokemonSets(pokemonSets.value.responseStatus.nextUrl);
};

onMounted(async () => {
    if (!pokemonSets.value.data.length) {
        await pokemonStore.getPokemonSets();
    }
});
</script>

<template>
    <SearchForm
        name="set"
        :isDisabled="pokemonSets.responseStatus.isLoading || !!pokemonSets.responseStatus.error"
        @updateFilter="handleUpdateFilter"
    />
    <template v-if="pokemonSets.responseStatus.ok && pokemonSets.data.length">
        <div class="pokemon-grid">
            <div
                class="set"
                v-for="pokemonSet in pokemonSets.data"
                :key="pokemonSet.id"
                v-show="showItem<PokemonSet>(pokemonSet, pokemonSetsFiltered)"
            >
                <RouterLink :to="{ name: 'set', params: { set_id: pokemonSet.id } }" class="box">
                    <LazyImage :src="pokemonSet.images.logo" :alt="pokemonSet.name" />
                </RouterLink>
                <div class="box-name">
                    <span>{{ pokemonSet.name }}</span>
                </div>
            </div>
        </div>
        <Message
            v-if="!pokemonSetsFiltered?.length && filters.name"
            type="error"
            :text="`No sets found for: <strong>${filters.name}</strong>`"
        />
    </template>
    <Message
        v-if="pokemonSets.responseStatus.error"
        type="error"
        :text="pokemonSets.responseStatus.error"
    />
    <LoadingState :responseStatus="pokemonSets.responseStatus" @loadMore="handleLoadMore" />
</template>
