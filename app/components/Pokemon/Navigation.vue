<script setup lang="ts">
import { resourceId } from 'pokenode-ts';

const { pokemonId } = defineProps<{
    pokemonId: number;
}>();

const { data: pokemonGroups, pending, error } = useLazyFetch('/api/pokemon');

const pokemon = computed(() => pokemonGroups.value?.flat());

const currentPokemonIndex = computed(() => {
    return pokemon.value?.findIndex((pkm) => resourceId(pkm.url) === pokemonId) || 0;
});

const firstPokemonId = computed(() => {
    const firstPokemon = pokemon.value?.at(0);

    if (firstPokemon) {
        return resourceId(firstPokemon);
    }

    return undefined;
});
const lastPokemonId = computed(() => {
    const lastPokemon = pokemon.value?.at(-1);

    if (lastPokemon) {
        return resourceId(lastPokemon);
    }

    return undefined;
});

const previousPokemonId = computed(() => {
    const previousPokemon = pokemon.value?.at(currentPokemonIndex.value - 1);

    if (previousPokemon) {
        return resourceId(previousPokemon.url);
    }

    return undefined;
});
const nextPokemonId = computed(() => {
    const nextPokemon = pokemon.value?.at(currentPokemonIndex.value + 1);

    if (nextPokemon) {
        return resourceId(nextPokemon.url);
    }

    return undefined;
});
</script>

<template>
    <UFieldGroup v-if="!error" class="w-full">
        <UButton
            :loading="pending"
            :disabled="pokemonId === firstPokemonId"
            :to="`/pokemon/${previousPokemonId}`"
            label="Previous"
            block
        />
        <UButton
            :loading="pending"
            :disabled="pokemonId === lastPokemonId"
            :to="`/pokemon/${nextPokemonId}`"
            label="Next"
            block
        />
    </UFieldGroup>
</template>
