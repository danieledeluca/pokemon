<script setup lang="ts">
import { localize } from 'pokenode-ts';

const { pokemonId } = defineProps<{
    pokemonId: number;
}>();

const { data: pokemonForms } = useLazyFetch(`/api/pokemon/forms/${pokemonId}`);
</script>

<template>
    <template v-if="pokemonForms && pokemonForms.length > 1">
        <template v-for="form in pokemonForms" :key="form.id">
            <PokemonImage
                :pokemonName="localize(form.names)?.name"
                :pokemonSpriteUrl="form.sprites.front_default ?? undefined"
            />
        </template>
    </template>
</template>
