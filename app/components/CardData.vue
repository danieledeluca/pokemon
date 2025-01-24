<script setup lang="ts">
const { card } = defineProps<{
    card: PokemonTCGCard;
}>();

const cardMarketFilteredPrices = filterCardMarketPrices(card.cardmarket?.prices);
</script>

<template>
    <main>
        <article class="basic">
            <h1>
                <span>{{ card.name }}</span>
            </h1>
            <h6>
                <span>{{ card.supertype }}</span>
                <span v-if="card.subtypes?.length"> - {{ card.subtypes.join(', ') }}</span>
            </h6>
            <p v-if="card.flavorText" class="flavour-text">
                {{ card.flavorText }}
            </p>
            <p v-if="card.hp" class="hp"><strong>HP: </strong>{{ card.hp }}</p>
            <p v-if="card.types?.length" class="types">
                <strong>Types: </strong>
                <CardType
                    v-for="type in card.types"
                    :key="type"
                    class="type"
                    :type="type"
                    size="small"
                />
            </p>
            <p v-if="card.level" class="level"><strong>Level: </strong>{{ card.level }}</p>
            <p v-if="card.rarity" class="rarity"><strong>Rarity: </strong>{{ card.rarity }}</p>
            <p class="set">
                <strong>
                    Set:
                    <NuxtLink :to="`/sets/${card.set.id}`">
                        <span>{{ card.set.name }}</span>
                        <img class="symbol" :src="card.set.images.symbol" :alt="card.set.name" />
                    </NuxtLink>
                </strong>
            </p>
            <p class="number"><strong>Number: </strong>{{ card.number }}/{{ card.set.total }}</p>
            <div v-if="card.artist" class="author">
                <cite>{{ card.artist }}</cite>
            </div>
        </article>
        <article v-if="card.weaknesses || card.resistances || card.retreatCost" class="attributes">
            <div class="attribute">
                <h5 class="title">
                    <span>Weakness</span>
                </h5>
                <div class="content">
                    <span v-for="weakness in card.weaknesses" :key="weakness.type" class="attr">
                        <CardType :type="weakness.type" size="large" />
                        <span class="value">{{ weakness.value }}</span>
                    </span>
                    <span v-if="!card.weaknesses?.length">N/A</span>
                </div>
            </div>
            <div class="attribute">
                <h5 class="title">
                    <span>Resistance</span>
                </h5>
                <div class="content">
                    <span
                        v-for="resistance in card.resistances"
                        :key="resistance.type"
                        class="attr"
                    >
                        <CardType :type="resistance.type" size="large" />
                        <span class="value">{{ resistance.value }}</span>
                    </span>
                    <span v-if="!card.resistances?.length">N/A</span>
                </div>
            </div>
            <div class="attribute">
                <h5 class="title">
                    <span>Retreat cost</span>
                </h5>
                <div class="content">
                    <span v-for="retreatCost in card.retreatCost" :key="retreatCost" class="attr">
                        <CardType :type="retreatCost" size="large" />
                    </span>
                    <span v-if="!card.retreatCost?.length">N/A</span>
                </div>
            </div>
        </article>
        <article v-if="card.rules?.length" class="rules">
            <h5 class="title">
                <span>Rules</span>
            </h5>
            <div class="content">
                <div v-for="rule in card.rules" :key="rule" class="rule">
                    <span>{{ rule }}</span>
                </div>
            </div>
        </article>
        <article v-if="card.abilities?.length" class="abilities">
            <h5 class="title">
                <span>Abilities</span>
            </h5>
            <div class="content">
                <div v-for="ability in card.abilities" :key="ability.name" class="ability">
                    <strong>{{ ability.type }}: {{ ability.name }}</strong>
                    <div>{{ ability.text }}</div>
                </div>
            </div>
        </article>
        <article v-if="card.attacks?.length" class="attacks">
            <h5 class="title">
                <span>Attacks</span>
            </h5>
            <div class="content">
                <div v-for="attack in card.attacks" :key="attack.name" class="attack">
                    <div class="data">
                        <div class="cost">
                            <CardType
                                v-for="cost in attack.cost"
                                :key="cost"
                                class="type"
                                :type="cost"
                                size="small"
                            />
                        </div>
                        <strong class="name">{{ attack.name }}</strong>
                        <strong class="damage">{{ attack.damage }}</strong>
                    </div>
                    <p>{{ attack.text }}</p>
                </div>
            </div>
        </article>
        <article v-if="card.evolvesFrom || card.evolvesTo?.length" class="evolutions">
            <h5 class="title">
                <span>Evolutions</span>
            </h5>
            <div class="content">
                <div v-if="card.evolvesFrom" class="evolution evolves-from">
                    <strong>Evolves from: </strong>
                    <NuxtLink :to="{ name: 'cards', query: { name: card.evolvesFrom } }">
                        <span>{{ card.evolvesFrom }}</span>
                    </NuxtLink>
                </div>
                <div v-if="card.evolvesTo?.length" class="evolution evolves-to">
                    <strong>Evolves to: </strong>
                    <span v-for="evolvesTo in card.evolvesTo" :key="evolvesTo">
                        <NuxtLink :to="{ name: 'cards', query: { name: evolvesTo } }">
                            <span>{{ evolvesTo }}</span>
                        </NuxtLink>
                    </span>
                </div>
            </div>
        </article>
        <article v-if="card.tcgplayer || card.cardmarket" class="prices">
            <div v-if="card.tcgplayer" class="tcg-player">
                <h5 class="title">
                    <span>TCGplayer</span>
                </h5>
                <a :href="card.tcgplayer.url" target="_blank" role="button" class="secondary">
                    <span>Buy now from TCGplayer</span>
                </a>
                <small class="last-update">
                    Last update: {{ formatDate(card.tcgplayer.updatedAt) }}
                </small>
                <div v-if="card.tcgplayer.prices" class="content">
                    <template v-for="(prices, rarity) in card.tcgplayer.prices" :key="rarity">
                        <div
                            v-for="(price, label) in filterTcgPrices(prices)"
                            :key="label"
                            class="price"
                        >
                            <span class="label">{{ TCGPriceLabel[rarity] }} {{ label }}: </span>
                            <span class="value" :class="label">
                                <template v-if="price">{{ formatPrice(price) }}</template>
                                <template v-else>N/A</template>
                            </span>
                        </div>
                    </template>
                </div>
            </div>
            <div v-if="card.cardmarket" class="card-market">
                <h5 class="title">
                    <span>Cardmarket</span>
                </h5>
                <a :href="card.cardmarket.url" target="_blank" role="button" class="secondary">
                    <span>Buy now from Cardmarket</span>
                </a>
                <small class="last-update">
                    Last update: {{ formatDate(card.cardmarket.updatedAt) }}
                </small>
                <div v-if="cardMarketFilteredPrices" class="content">
                    <template v-for="(price, label) in cardMarketFilteredPrices" :key="label">
                        <div class="price">
                            <span class="label">{{ CardMarketPriceLabel[label] }}: </span>
                            <span class="value card-market">
                                <template v-if="price">{{ formatPrice(price) }}</template>
                                <template v-else>N/A</template>
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </article>
    </main>
</template>

<style scoped>
article {
    border: 1px solid var(--pico-muted-border-color);
}

article:last-child {
    margin-bottom: 0;
}

article :where(p, ul, li):last-child {
    margin-bottom: 0;
}

.types .type {
    vertical-align: middle;
}

.types .type:not(:last-child) {
    margin-right: 0.25rem;
}

.symbol {
    width: 1.5rem;
    margin-left: 0.5rem;
}

.author {
    text-align: right;
}

.attributes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.attributes .content,
.attr {
    --gap: 0.25rem;

    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--gap);
}

.attributes .content:has(.value) {
    --gap: 0.75rem;
}

:where(.rule, .ability, .attack, .evolution, .prices > *):not(:last-child) {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--pico-muted-border-color);
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

.prices > * {
    position: relative;
}

.prices [role='button'] {
    --pico-form-element-spacing-vertical: 0.5rem;
    --pico-form-element-spacing-horizontal: 0.75rem;

    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.75rem;
}

.prices .last-update {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: var(--pico-muted-color);
}

.prices .content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

.prices .price {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.price .label {
    display: block;
    margin-bottom: auto;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
}

.price .value {
    color: var(--color);
    font-weight: 600;
}

.price .value.low {
    --color: var(--pico-color-green);
}

.price .value.mid {
    --color: var(--pico-color-blue);
}

.price .value.high {
    --color: var(--pico-color-red);
}

.price .value.market {
    --color: var(--pico-color-purple);
}

.price .value.card-market {
    --color: var(--pico-color-pumpkin);
}
</style>
