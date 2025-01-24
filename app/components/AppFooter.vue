<template>
    <footer>
        <div class="container">
            <small>
                &copy; {{ new Date().getFullYear() }} - Daniele De Luca - Thanks to
                <a href="https://pokemontcg.io/" target="_blank">Pokémon TCG</a> and
                <a href="https://pokeapi.co/" target="_blank">PokeAPI</a> for all the data.
            </small>
        </div>
    </footer>
</template>

<style scoped>
footer {
    padding-block: 1rem;
    border-top: 1px solid var(--pico-muted-border-color);
    text-align: center;
}
</style>
