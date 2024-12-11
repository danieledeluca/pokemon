<script setup lang="ts">
import { getSearchParam, setSearchParam } from '@/utils';
import type { PokemonCardFilters } from '@/utils/models';
import { reactive, watch } from 'vue';
import SearchForm from './SearchForm.vue';

const props = defineProps<{
    isDisabled: boolean;
    rarities: string[];
    types: string[];
    subtypes: string[];
}>();

const emit = defineEmits<{
    updateName: [name: string];
    updateFilters: [filters: Omit<PokemonCardFilters, 'name'>];
}>();

const filters: PokemonCardFilters = reactive({
    name: getSearchParam('name'),
    rarity: getSearchParam('rarity'),
    type: getSearchParam('type'),
    subtype: getSearchParam('subtype'),
});

const handleUpdateFilter = (newFilter: string) => {
    filters.name = newFilter;
};

watch(
    filters,
    (newFilters) => {
        Object.entries(newFilters).forEach(([key, value]) => {
            if (key !== 'name') {
                setSearchParam(key, value);
            }
        });

        emit('updateName', newFilters.name);
        emit('updateFilters', {
            rarity: newFilters.rarity,
            type: newFilters.type,
            subtype: newFilters.subtype,
        });
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <SearchForm name="card" :isDisabled="props.isDisabled" @updateFilter="handleUpdateFilter">
        <fieldset class="grid" :disabled="props.isDisabled">
            <label v-if="props.rarities.length > 1">
                Select a card rarity
                <select v-model="filters.rarity" :disabled="!props.rarities.length">
                    <option selected value="">All rarities</option>
                    <option v-for="rarity in props.rarities" :key="rarity" :value="rarity">
                        {{ rarity }}
                    </option>
                </select>
            </label>
            <label v-if="props.types.length > 1">
                Select a card type
                <select v-model="filters.type" :disabled="!props.types.length">
                    <option selected value="">All types</option>
                    <option v-for="type in props.types" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
            </label>
            <label v-if="props.subtypes.length > 1">
                Select a card subtype
                <select v-model="filters.subtype" :disabled="!props.subtypes.length">
                    <option selected value="">All subtypes</option>
                    <option v-for="subType in props.subtypes" :key="subType" :value="subType">
                        {{ subType }}
                    </option>
                </select>
            </label>
        </fieldset>
    </SearchForm>
</template>
