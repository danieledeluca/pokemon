<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { computed, onMounted, reactive } from 'vue';
import SearchForm from '@/components/SearchForm.vue';
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import type { PokemonSet } from '@/models';
import { useDebounceFn } from '@vueuse/core';
import { filterList, showItem } from '@/composables/pokemon';
import { onBeforeRouteLeave } from 'vue-router';
import { clearSearchParams } from '@/composables/utils';

const filters = reactive({
    name: '',
});

const pokemonStore = usePokemonStore();
const pokemonSets = computed(() => pokemonStore.pokemonSets);
const pokemonSetsFiltered = computed(() => filterList<PokemonSet>(filters.name, pokemonSets.value.data));

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

onBeforeRouteLeave(() => clearSearchParams());
</script>

<template>
    <SearchForm
        name="set"
        :is-disabled="pokemonSets.responseStatus.isLoading || !!pokemonSets.responseStatus.error"
        @update-filter="handleUpdateFilter"
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
                    <img :src="pokemonSet.images.logo" :alt="pokemonSet.name" loading="lazy" class="set-image" />
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
    <Message v-if="pokemonSets.responseStatus.error" type="error" :text="pokemonSets.responseStatus.error" />
    <LoadingState :response-status="pokemonSets.responseStatus" @load-more="handleLoadMore" />
</template>

<style scoped>
.box {
    position: relative;
    aspect-ratio: 1;
}

.set-image {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: calc(100% - var(--pico-block-spacing-horizontal) * 2);
    max-height: calc(100% - var(--pico-block-spacing-vertical) * 2);
    translate: -50% -50%;
}
</style>
