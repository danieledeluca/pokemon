<script setup lang="ts">
import type { Market, PokemonCard, Price } from '@/utils/models';
import { toRefs } from 'vue';
import { RouterLink } from 'vue-router';
import PokemonType from './PokemonType.vue';

const props = defineProps<{
    pokemonCard: PokemonCard;
}>();

const { pokemonCard } = toRefs(props);

function getCardPrice(market: Market) {
    let price: number | undefined;

    switch (market) {
        case 'tcgplayer':
            price = (Object.values(pokemonCard.value.tcgplayer?.prices || {})[0] as Price)?.mid;
            break;

        case 'cardmarket':
            price = pokemonCard.value.cardmarket?.prices.averageSellPrice;
            break;

        default:
            break;
    }

    if (price) {
        return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    }
}

function getCardLastUpdateAt(market: Market) {
    let date: string | undefined;

    switch (market) {
        case 'tcgplayer':
            date = pokemonCard.value.tcgplayer?.updatedAt;
            break;

        case 'cardmarket':
            date = pokemonCard.value.cardmarket?.updatedAt;
            break;

        default:
            break;
    }

    if (date) {
        return Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date));
    }
}
</script>

<template>
    <div class="card-data">
        <article class="main-data">
            <h1 class="name">
                <span>{{ pokemonCard.name }}</span>
            </h1>
            <ul class="rules" v-if="pokemonCard.rules?.length">
                <li class="rule" v-for="pokemonRule in pokemonCard.rules" :key="pokemonRule">
                    <span>{{ pokemonRule }}</span>
                </li>
            </ul>
            <p class="flavour-text" v-if="pokemonCard.flavorText">
                {{ pokemonCard.flavorText }}
            </p>
            <p class="hp"><strong>HP: </strong>{{ pokemonCard.hp }}</p>
            <p class="level" v-if="pokemonCard.level"><strong>Level: </strong>{{ pokemonCard.level }}</p>
            <p class="rarity" v-if="pokemonCard.rarity"><strong>Rarity: </strong>{{ pokemonCard.rarity }}</p>
            <p class="set">
                <strong>
                    Set:
                    <RouterLink :to="{ name: 'set', params: { set_id: pokemonCard.set.id } }">
                        <span>{{ pokemonCard.set.name }}</span>
                    </RouterLink>
                </strong>
            </p>
            <div class="author">
                <cite>{{ pokemonCard.artist }}</cite>
            </div>
        </article>
        <article
            class="attributes"
            v-if="pokemonCard.types?.length || pokemonCard.resistances?.length || pokemonCard.weaknesses?.length"
        >
            <div class="types" v-if="pokemonCard.types?.length">
                <h6 class="title">
                    <span>Types</span>
                </h6>
                <div class="content">
                    <div class="type" v-for="pokemonType in pokemonCard.types" :key="pokemonType">
                        <PokemonType :pokemonType="pokemonType" size="large" />
                    </div>
                </div>
            </div>
            <div class="weaknesses" v-if="pokemonCard.weaknesses?.length">
                <h6 class="title">
                    <span>Weaknesses</span>
                </h6>
                <div class="content">
                    <div class="weakness" v-for="pokemonWeakness in pokemonCard.weaknesses" :key="pokemonWeakness.type">
                        <PokemonType :pokemonType="pokemonWeakness.type" size="large" />
                        <span class="value">{{ pokemonWeakness.value }}</span>
                    </div>
                </div>
            </div>
            <div class="resistances" v-if="pokemonCard.resistances?.length">
                <h6 class="title">
                    <span>Resistances</span>
                </h6>
                <div class="content">
                    <div
                        class="resistance"
                        v-for="pokemonResistance in pokemonCard.resistances"
                        :key="pokemonResistance.type"
                    >
                        <PokemonType :pokemonType="pokemonResistance.type" size="large" />
                        <span class="value">{{ pokemonResistance.value }}</span>
                    </div>
                </div>
            </div>
            <div class="retreat-cost" v-if="pokemonCard.retreatCost?.length">
                <h6 class="title">
                    <span>Retreat cost</span>
                </h6>
                <div class="content">
                    <div class="resistance" v-for="retreatCost in pokemonCard.retreatCost" :key="retreatCost">
                        <PokemonType :pokemonType="retreatCost" size="large" />
                    </div>
                </div>
            </div>
        </article>
        <article class="abilities" v-if="pokemonCard.abilities?.length">
            <h6 class="title">
                <span>Abilities</span>
            </h6>
            <div class="content">
                <ul class="list">
                    <li class="ability" v-for="pokemonAbility in pokemonCard.abilities" :key="pokemonAbility.name">
                        <strong>{{ pokemonAbility.type }}: {{ pokemonAbility.name }}</strong>
                        <div>{{ pokemonAbility.text }}</div>
                    </li>
                </ul>
            </div>
        </article>
        <article class="attacks" v-if="pokemonCard.attacks?.length">
            <h6 class="title">
                <span>Attacks</span>
            </h6>
            <div class="content">
                <ul class="list">
                    <li class="attack" v-for="pokemonAttack in pokemonCard.attacks" :key="pokemonAttack.name">
                        <strong class="data">
                            <span class="cost">
                                <PokemonType
                                    v-for="cost in pokemonAttack.cost"
                                    :key="cost"
                                    :pokemonType="cost"
                                    size="small"
                                />
                            </span>
                            <span class="name">{{ pokemonAttack.name }}</span>
                            <span class="damage">{{ pokemonAttack.damage }}</span>
                        </strong>
                        <div>{{ pokemonAttack.text }}</div>
                    </li>
                </ul>
            </div>
        </article>
        <article class="evolutions" v-if="pokemonCard.evolvesFrom || pokemonCard.evolvesTo">
            <h6 class="title">
                <span>Evolutions</span>
            </h6>
            <div class="content">
                <ul class="list">
                    <li class="evolves-from" v-if="pokemonCard.evolvesFrom">
                        <span>Evolves from: </span>
                        <RouterLink :to="{ name: 'cards', query: { name: pokemonCard.evolvesFrom } }">
                            <span>{{ pokemonCard.evolvesFrom }}</span>
                        </RouterLink>
                    </li>
                    <li class="evolves-to" v-if="pokemonCard.evolvesTo">
                        <span>Evolves to: </span>
                        <span v-for="evolution in pokemonCard.evolvesTo" :key="evolution">
                            <RouterLink :to="{ name: 'cards', query: { name: evolution } }">
                                <span>{{ evolution }}</span>
                            </RouterLink>
                        </span>
                    </li>
                </ul>
            </div>
        </article>
        <article class="market" v-if="pokemonCard.tcgplayer || pokemonCard.cardmarket">
            <div class="tcg-player" v-if="pokemonCard.tcgplayer">
                <h6 class="title">
                    <span>TCGplayer</span>
                </h6>
                <div class="content">
                    <a :href="pokemonCard.tcgplayer.url" target="_blank" class="secondary">
                        <span>View prices</span>
                    </a>
                    <small>
                        (last update:
                        <template v-if="getCardPrice('tcgplayer')">{{ getCardPrice('tcgplayer') }} -</template>
                        {{ getCardLastUpdateAt('tcgplayer') }})
                    </small>
                </div>
            </div>
            <div class="card-market" v-if="pokemonCard.cardmarket">
                <h6 class="title">
                    <span>Cardmarket</span>
                </h6>
                <div class="content">
                    <a :href="pokemonCard.cardmarket.url" target="_blank" class="secondary">
                        <span>View prices</span>
                    </a>
                    <small>
                        (last update:
                        <template v-if="getCardPrice('cardmarket')">{{ getCardPrice('cardmarket') }} -</template>
                        {{ getCardLastUpdateAt('cardmarket') }})
                    </small>
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
article {
    border: 1px solid var(--pico-muted-border-color);
}

article:has(> div + div) > div:not(:last-child) {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--pico-muted-border-color);
}

article:last-child {
    margin-bottom: 0;
}

.main-data .author {
    text-align: right;
}

.attributes .content {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.abilities .list {
    margin-bottom: 0;
}

.weakness,
.resistance {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}

.attack .data {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.attack .cost {
    display: inline-flex;
    gap: 0.25rem;
}

.attack .name {
    margin-right: auto;
}

.evolves-to span:not(:first-child):not(:last-child)::after {
    content: ' | ';
}
</style>
