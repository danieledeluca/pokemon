<script setup lang="ts">
import type { FormSubmitEvent, SelectItem } from '@nuxt/ui';
import type { SpriteVariant } from 'pokenode-ts';

import { resourceId } from 'pokenode-ts';

import type { PokemonSchema } from '#imports';

useSeoMeta({
    title: 'Pokémon',
    description: 'A list of all Pokémon.',
});

const state = reactive<PokemonSchema>({
    name: getQueryValue('name'),
    page: Number(getQueryValue('page')) || 1,
    shiny: Boolean(getQueryValue('shiny')) || false,
    variant: getQueryValue('variant') as SpriteVariant || 'default',
});

const { data: pokemonGroups, pending, error, refresh } = useLazyFetch('/api/pokemon', {
    query: state,
    watch: false,
});

const spriteVariantsItems: SelectItem[] = spriteVariants.map((variant) => {
    return {
        label: kebabToCapital(variant),
        value: variant,
    };
});

function handleSubmit(event: FormSubmitEvent<PokemonSchema>) {
    if (pending.value) {
        return;
    }

    setQueryValues({
        name: event.data.name,
        page: undefined,
    });
    refresh();
}
</script>

<template>
    <UForm
        :schema="PokemonSchema"
        :state
        class="mb-4 space-y-4 sm:mb-6 lg:mb-8"
        @submit="handleSubmit"
    >
        <UFieldGroup class="w-full">
            <UInput
                v-model="state.name"
                class="w-full"
                icon="i-lucide-search"
                placeholder="Search for a card"
            />
            <UButton type="submit" label="Search" />
        </UFieldGroup>
        <div class="flex items-end justify-between gap-4">
            <UFormField label="Sprite" class="flex-1">
                <USelect
                    v-model="state.variant"
                    :items="spriteVariantsItems"
                    class="w-full"
                    @update:modelValue="(value) => {
                        setQueryValue('variant', value?.toString() === 'default' ? undefined : value?.toString())

                        if (value === 'dream-world') {
                            state.shiny = false
                        }
                    }"
                />
            </UFormField>
            <UFormField class="flex h-8 items-center">
                <USwitch
                    v-model="state.shiny"
                    label="Shiny"
                    :disabled="state.variant === 'dream-world'"
                    @update:modelValue="(value) => setQueryValue('shiny', !value ? undefined : String(value))"
                />
            </UFormField>
        </div>
    </UForm>
    <template v-if="pending">
        <div class="list-grid">
            <div v-for="n in 10" :key="n">
                <USkeleton class="list-card" />
                <USkeleton class="list-title h-6" />
            </div>
        </div>
    </template>
    <UAlert v-else-if="error" color="error" :title="error.message" />
    <template v-else-if="pokemonGroups">
        <template v-if="pokemonGroups.length > 0">
            <template v-for="(pokemon, index) in pokemonGroups" :key="index">
                <div v-if="index + 1 === state.page" class="list-grid">
                    <PokemonCard
                        v-for="pkm in pokemon"
                        :key="pkm.name"
                        :pokemonId="resourceId(pkm.url)"
                        :shiny="state.shiny"
                        :variant="state.variant"
                    />
                </div>
            </template>
            <UPagination
                v-if="pokemonGroups.length > 1"
                v-model:page="state.page"
                :total="pokemonGroups.flat().length"
                :itemsPerPage="POKEMON_PER_PAGE"
                class="mt-4 sm:mt-6 lg:mt-8"
                :ui="{
                    list: 'justify-center',
                }"
                @update:page="(value) => setQueryValue('page', value === 1 ? undefined : value.toString())"
            />
        </template>
        <UAlert v-else color="warning" :title="`No pokemon fond for: ${state.name}`" />
    </template>
</template>
