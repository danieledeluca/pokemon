<script setup lang="ts">
const { card } = defineProps<{
    card: TcgCard;
}>();

const cardMarketFilteredPrices = filterTcgCardMarketPrices(card.pricing.cardmarket);
const tcgPlayerFilteredPrices = filterTcgCardTcgPlayerPrices(card.pricing.tcgplayer);
</script>

<template>
    <main>
        <article class="basic">
            <h1>
                <span>{{ card.name }}</span>
            </h1>
            <h6>
                <span class="category">{{ card.category }}</span>
                <span v-if="card.suffix" class="suffix">&nbsp;{{ card.suffix }}</span>
                <span v-if="card.trainerType" class="trainer-type"> - {{ card.trainerType }}</span>
                <span v-if="card.stage" class="stage"> - {{ card.stage }}</span>
            </h6>
            <p v-if="card.effect" class="effect">{{ parseTcgText(card.effect) }}</p>
            <p v-if="card.description" class="description">{{ card.description }}</p>
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
                        <img
                            v-if="card.set.symbol"
                            class="symbol"
                            :src="`${card.set.symbol}.png`"
                            :alt="card.set.name"
                        />
                    </NuxtLink>
                    <small v-if="card.boosters">
                        ({{ card.boosters.map((booster) => booster.name).join(', ') }})
                    </small>
                </strong>
            </p>
            <p class="number">
                <strong>Number: </strong>{{ card.localId }}/{{ card.set.cardCount.total }}
            </p>
            <div v-if="card.illustrator" class="illustrator">
                <cite>{{ card.illustrator }}</cite>
            </div>
        </article>
        <article v-if="card.weaknesses || card.resistances || card.retreat" class="attributes">
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
                    <span v-for="retreat in card.retreat" :key="retreat" class="attr">
                        <CardType type="Colorless" size="large" :showTooltip="false" />
                    </span>
                    <span v-if="!card.retreat">N/A</span>
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
                    <div>{{ parseTcgText(ability.effect) }}</div>
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
                    <p>{{ parseTcgText(attack.effect) }}</p>
                </div>
            </div>
        </article>
        <article v-if="card.item" class="held-item">
            <h5 class="title">
                <span>Held item</span>
            </h5>
            <div class="content">
                <strong>{{ card.item.name }}: {{ card.item.effect }}</strong>
            </div>
        </article>
        <article v-if="card.evolveFrom" class="evolutions">
            <h5 class="title">
                <span>Evolutions</span>
            </h5>
            <div class="content">
                <div class="evolution evolves-from">
                    <strong>Evolves from: </strong>
                    <NuxtLink
                        :to="{ name: 'cards', query: { name: card.evolveFrom.toLowerCase() } }"
                    >
                        <span>{{ card.evolveFrom }}</span>
                    </NuxtLink>
                </div>
            </div>
        </article>
        <article v-if="card.pricing?.cardmarket || card.pricing?.tcgplayer" class="prices">
            <div v-if="card.pricing.cardmarket" class="card-market">
                <h5 class="title">
                    <span>Cardmarket</span>
                </h5>
                <small class="last-update">
                    Last update: {{ formatDate(card.pricing.cardmarket.updated) }}
                </small>
                <div class="content">
                    <template v-for="(price, label) in cardMarketFilteredPrices" :key="label">
                        <div class="price">
                            <span class="label">{{ parseTcgPriceLabel(label) }}: </span>
                            <span class="value card-market">
                                <template v-if="price">
                                    {{ formatPrice(price, card.pricing.cardmarket.unit) }}
                                </template>
                                <template v-else>N/A</template>
                            </span>
                        </div>
                    </template>
                </div>
            </div>
            <div v-if="card.pricing.tcgplayer" class="tcg-player">
                <h5 class="title">
                    <span>TCGplayer</span>
                </h5>
                <small class="last-update">
                    Last update: {{ formatDate(card.pricing.tcgplayer.updated) }}
                </small>
                <div class="content">
                    <template v-for="(prices, rarity) in tcgPlayerFilteredPrices" :key="rarity">
                        <p class="rarity">{{ parseName(rarity) }}</p>
                        <div v-for="(price, label) in prices" :key="label" class="price">
                            <span class="label">{{ parseTcgPriceLabel(label) }}:</span>
                            <span class="value" :class="label">
                                <template v-if="price">
                                    {{ formatPrice(price, card.pricing.tcgplayer.unit) }}
                                </template>
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

.illustrator {
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

:is(.rule, .ability, .attack, .evolution, .prices > *):not(:last-child) {
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

.prices .content + .content {
    margin-top: 1.5rem;
}

.prices .rarity {
    grid-column: 1 / -1;
    margin-bottom: -0.5rem;
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

.price .value.lowPrice {
    --color: var(--pico-color-green);
}

.price .value.midPrice {
    --color: var(--pico-color-blue);
}

.price .value.highPrice {
    --color: var(--pico-color-red);
}

.price .value.marketPrice {
    --color: var(--pico-color-purple);
}

.price .value.card-market {
    --color: var(--pico-color-pumpkin);
}
</style>
