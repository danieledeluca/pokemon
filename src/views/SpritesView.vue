<script setup lang="ts">
import LoadingState from '@/components/LoadingState.vue';
import Message from '@/components/Message.vue';
import PokemonSprites from '@/components/PokemonSprites.vue';
import SearchForm from '@/components/SearchForm.vue';
import { filterList } from '@/composables/pokemon';
import { clearSearchParams, getSearchParam, setSearchParam } from '@/composables/utils';
import type { PokemonSprite } from '@/models';
import { usePokemonStore } from '@/stores/pokemon';
import { useDebounceFn } from '@vueuse/core';
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const filters = reactive({
    name: getSearchParam('name'),
    type: getSearchParam('type'),
    region: getSearchParam('region'),
});

const pokemonStore = usePokemonStore();
const pokemonSprites = computed(() => pokemonStore.pokemonSprites);
const pokemonSpritesFiltered = computed(() => filterList<PokemonSprite>(filters.name, pokemonSprites.value.data));
const pokemonSpriteTypes = pokemonStore.pokemonSpriteTypes;
const pokemonRegions = computed(() => pokemonStore.pokemonRegions);

const handleUpdateFilter = useDebounceFn((newFilter: string) => {
    filters.name = newFilter;
}, 1000);

async function handleLoadMore() {
    await pokemonStore.getPokemonSprites(
        '',
        '',
        pokemonSprites.value.responseStatus.nextUrl,
        pokemonSprites.value.data
    );
}

watch(filters, (newFilters) => {
    Object.entries(newFilters).forEach(([key, value]) => {
        setSearchParam(key, value);
    });
});

watch(
    () => [filters.name, filters.region],
    async ([newName, newRegion]) => {
        await pokemonStore.getPokemonSprites(newName, newRegion);
    }
);

onMounted(async () => {
    if (!pokemonSprites.value.data.length) {
        pokemonStore.getPokemonSprites(filters.name, filters.region);
    }
});

onUnmounted(() => {
    if (Object.values(filters).some((value) => value)) {
        pokemonSprites.value.data = [];
    }
});

onBeforeRouteLeave(() => clearSearchParams());
</script>

<template>
    <SearchForm
        name="pokemon"
        :is-disabled="pokemonSprites.responseStatus.isLoading || !!pokemonSprites.responseStatus.error"
        @update-filter="handleUpdateFilter"
    >
        <fieldset
            class="grid"
            :disabled="pokemonSprites.responseStatus.isLoading || !!pokemonSprites.responseStatus.error"
        >
            <label>
                Select the type of the sprite
                <select v-model="filters.type">
                    <option
                        v-for="pokemonSpriteType in pokemonSpriteTypes"
                        :key="pokemonSpriteType.value"
                        :value="pokemonSpriteType.value"
                    >
                        {{ pokemonSpriteType.label }}
                    </option>
                </select>
            </label>
            <label>
                Select the Pokèmon region
                <select v-model="filters.region" :disabled="!pokemonRegions.length">
                    <option selected value="">All regions</option>
                    <option
                        v-for="pokemonRegion in pokemonRegions"
                        :key="pokemonRegion.id"
                        :value="pokemonRegion.name.toLowerCase()"
                    >
                        {{ pokemonRegion.name }}
                    </option>
                </select>
            </label>
        </fieldset>
    </SearchForm>
    <template v-if="pokemonSprites.responseStatus.ok">
        <PokemonSprites
            :pokemon-sprites="pokemonSprites.data"
            :pokemon-sprites-filtered="pokemonSpritesFiltered"
            :pokemon-sprite-type="filters.type"
        />
        <Message
            v-if="!pokemonSpritesFiltered?.length && Object.values(filters).some((value) => value)"
            type="error"
            text="No Pokèmon found"
        />
    </template>
    <Message v-if="pokemonSprites.responseStatus.error" type="error" :text="pokemonSprites.responseStatus.error" />
    <LoadingState :response-status="pokemonSprites.responseStatus" @load-more="handleLoadMore" />
</template>
