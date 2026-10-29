<script setup lang="ts">
import { localize } from 'pokenode-ts';

const { pokemonId } = defineProps<{
    pokemonId: number;
}>();

const { data: pokemonForms, pending } = await useFetch(`/api/pokemon/forms/${pokemonId}`);
</script>

<template>
    <template v-if="pending">
        <USkeleton class="h-56 w-full" />
    </template>
    <UPageCard v-else-if="pokemonForms && pokemonForms.length > 1" variant="subtle" title="Forms">
        <div class="pokemon-grid">
            <template v-for="form in pokemonForms" :key="form.id">
                <PokemonImage
                    :pokemonName="localize(form.names)?.name"
                    :pokemonSpriteUrl="form.sprites.front_default ?? undefined"
                />
            </template>
        </div>
    </UPageCard>
</template>
