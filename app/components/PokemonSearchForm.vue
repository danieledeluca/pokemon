<script setup lang="ts">
const filters = defineModel<PokemonFilters>('filters', { required: true });

const sprites: SpriteTypes[] = [
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
        <input
            v-model="filters.name"
            type="search"
            name="name"
            placeholder="Search for a pokemon"
        />
        <input type="hidden" name="type" :value="filters.sprite" />
        <button type="submit">
            <span>Search</span>
        </button>
    </form>
    <form>
        <label for="type">Select the type of the sprite</label>
        <select id="type" v-model="filters.sprite" name="type">
            <option v-for="sprite in sprites" :key="sprite" :value="sprite">
                {{ parseName(sprite) }}
            </option>
        </select>
    </form>
</template>

<style scoped>
select {
    margin-bottom: 0;
}
</style>
