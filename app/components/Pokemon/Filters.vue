<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import type { SpriteVariant } from 'pokenode-ts';

const filters = defineModel<PokemonFiltersState>('filters', { required: true });

const spriteVariantsItems = spriteVariants.map<SelectItem & { value: SpriteVariant }>((variant) => {
    return {
        label: kebabToCapital(variant),
        value: variant,
    };
});

function handleVariantUpdate(value?: SpriteVariant) {
    if (value === 'dream-world') {
        filters.value.shiny = false;
    }
}
</script>

<template>
    <div class="flex items-end justify-between gap-4">
        <UFormField label="Sprite" class="flex-1">
            <USelect
                v-model="filters.variant"
                :items="spriteVariantsItems"
                class="w-full"
                @update:modelValue="handleVariantUpdate"
            />
        </UFormField>
        <UFormField class="flex h-8 items-center">
            <USwitch v-model="filters.shiny" label="Shiny" :disabled="filters.variant === 'dream-world'" />
        </UFormField>
    </div>
</template>
