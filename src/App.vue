<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
    <Header />
    <main class="main">
        <div class="container">
            <RouterView />
        </div>
    </main>
    <footer class="footer">
        <div class="container">
            <small>
                Thanks to <a href="https://pokemontcg.io/" target="_blank">Pokèmon TCG</a> and
                <a href="https://pokeapi.co/" target="_blank">PokeAPI</a> for all the data.
            </small>
        </div>
    </footer>
</template>
