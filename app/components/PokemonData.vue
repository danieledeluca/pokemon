<script setup lang="ts">
import type { Pokemon, PokemonForm } from 'pokenode-ts';

const { pokemon } = defineProps<{
    pokemon: Pokemon;
}>();

const { name, flavourText, species } = await usePokemon(pokemon);
const { evolutionChain } = await useEvolutionChain(species.value);
const forms: PokemonForm[] = [];

if (pokemon.forms.length > 1) {
    for (const pokemonForm of pokemon.forms) {
        const { form } = await usePokemonForm(pokemonForm);

        if (form.value) {
            forms.push(form.value);
        }
    }
}
</script>

<template>
    <main>
        <article class="basic">
            <h1>
                <span>{{ name }}</span>
            </h1>
            <p class="flavour-text">{{ flavourText }}</p>
            <p class="height"><strong>Height: </strong>{{ Number(pokemon.height) / 10 }} m</p>
            <p class="weight"><strong>Weight: </strong>{{ Number(pokemon.weight) / 10 }} kg</p>
            <p class="types">
                <strong>Types: </strong>
                <PokemonType
                    v-for="type in pokemon.types"
                    :key="type.type.name"
                    :type="type.type.name"
                />
            </p>
        </article>
        <article v-if="evolutionChain" class="evolutions">
            <h5 class="title">
                <span>Evolutions</span>
            </h5>
            <div class="content">
                <EvolutionChain
                    v-for="subEvolutionChain in evolutionChain"
                    :key="subEvolutionChain.name"
                    :evolutionChain="subEvolutionChain"
                />
            </div>
        </article>
        <article v-if="species && species.varieties.length > 1" class="varieties">
            <h5 class="title">
                <span>Varieties</span>
            </h5>
            <div class="content">
                <template v-for="variety in species.varieties" :key="variety.pokemon.name">
                    <div v-if="getIdFromUrl(variety.pokemon.url) !== pokemon.id" class="variety">
                        <NuxtLink
                            :to="`/pokemon/${getIdFromUrl(variety.pokemon.url)}`"
                            class="image"
                            :data-tooltip="parseName(variety.pokemon.name)"
                        >
                            <AppImage
                                :src="getPokemonSprites(variety.pokemon.url)['front-default']"
                                :alt="variety.pokemon.name"
                                :showPlaceholder="false"
                            />
                        </NuxtLink>
                        <div class="name">
                            <span>{{ parseName(variety.pokemon.name) }}</span>
                        </div>
                    </div>
                </template>
            </div>
        </article>
        <article v-if="forms.length" class="forms">
            <h5 class="title">
                <span>Forms</span>
            </h5>
            <div class="content">
                <template v-for="form in forms" :key="form.name">
                    <div v-if="form.id !== pokemon.id" class="form">
                        <div class="image" :data-tooltip="parseName(form.name)">
                            <AppImage
                                :src="form.sprites.front_default || ''"
                                :alt="form.name"
                                :showPlaceholder="false"
                            />
                        </div>
                        <div class="name">
                            <span>{{ parseName(form.name) }}</span>
                        </div>
                    </div>
                </template>
            </div>
        </article>
    </main>
</template>

<style scoped>
.content {
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    gap: 1rem;
    width: 100%;
    text-align: center;
}

@media (min-width: 576px) {
    .content {
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    }
}
</style>

<style>
.pokemon .content .image {
    display: inline-block;
    max-width: 96px;
    aspect-ratio: 1;
}

.pokemon .content img {
    height: 100%;
    object-fit: contain;
}

.pokemon .content .name {
    display: -webkit-box;
    margin-top: 0.5rem;
    font-size: 0.875em;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
}

@media (min-width: 768px) {
    .pokemon .content .name {
        display: none;
    }
}
</style>
