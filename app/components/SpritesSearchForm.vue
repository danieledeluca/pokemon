<script setup lang="ts">
const filters = defineModel<SpriteFilters>('filters', { required: true });

const typeOptions: (keyof SpriteTypes)[] = [
    'front-default',
    'front-shiny',
    'home-front-default',
    'home-front-shiny',
    'official-artwork-front-default',
    'official-artwork-front-shiny',
    'showdown-front-default',
    'showdown-front-shiny',
];
</script>

<template>
    <form role="search">
        <input v-model="filters.name" type="search" name="name" placeholder="Search for a sprite" />
        <input type="hidden" name="type" :value="filters.type" />
        <button type="submit">
            <span>Search</span>
        </button>
    </form>
    <form>
        <label for="type">Select the type of the sprite</label>
        <select id="type" v-model="filters.type" name="type">
            <option v-for="type in typeOptions" :key="type" :value="type">
                {{ parseName(type) }}
            </option>
        </select>
    </form>
</template>

<style scoped>
select {
    margin-bottom: 0;
}
</style>
