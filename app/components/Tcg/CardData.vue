<script setup lang="ts">
import type { Card } from '@tcgdex/sdk';

const { card } = defineProps <{
    card: Card;
}>();

const showSymbol = ref(true);
</script>

<template>
    <div class="space-y-4 sm:space-y-6 lg:space-y-8">
        <UPageCard
            variant="subtle"
            :title="card.name"
            :ui="{
                title: 'text-2xl',
            }"
        >
            <div class="text-lg">
                <span>{{ card.category }}</span>
                <span v-if="card.suffix">&nbsp;{{ card.suffix }}</span>
                <span v-if="card.trainerType"> - {{ card.trainerType }}</span>
                <span v-if="card.stage"> - {{ card.stage }}</span>
            </div>
            <div v-if="card.effect">
                {{ parseTcgText(card.effect) }}
            </div>
            <div v-if="card.description">
                {{ card.description }}
            </div>
            <div v-if="card.hp">
                <strong>HP </strong>
                <span>{{ card.hp }}</span>
            </div>
            <div v-if="card.types">
                <strong>Types </strong>
                <span class="inline-flex flex-wrap gap-1 align-middle">
                    <TcgType
                        v-for="(type, index) in card.types"
                        :key="index"
                        :type
                        size="small"
                    />
                </span>
            </div>
            <div v-if="card.level">
                <strong>Level </strong>
                <span>{{ card.level }}</span>
            </div>
            <div>
                <strong>Rarity </strong>
                <span>{{ card.rarity }}</span>
            </div>
            <div>
                <strong>Set </strong>
                <ULink :to="`/sets/${card.set.id}`">
                    <span>{{ card.set.name }}</span>
                    <NuxtImg
                        v-if="card.set.symbol && showSymbol"
                        :src="`${card.set.symbol}.png`"
                        :alt="card.set.name"
                        class="ml-2 inline-block size-5"
                        @error="showSymbol = false"
                    />
                </ULink>
            </div>
            <div>
                <strong>No. </strong>
                <span>{{ card.localId.padStart(card.set.cardCount.total.toString().length, '0') }}/</span>
                <span>{{ card.set.cardCount.total }}</span>
            </div>
            <div v-if="card.illustrator" class="text-right text-muted italic">
                {{ card.illustrator }}
            </div>
        </UPageCard>
        <UPageCard
            v-if="card.weaknesses || card.resistances || card.retreat"
            variant="subtle"
            title="Battle Traits"
        >
            <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
                <div class="flex flex-col">
                    <div class="mb-4">
                        Weaknesses
                    </div>
                    <div v-if="card.weaknesses" class="flex flex-col gap-4">
                        <div v-for="(weakness, index) in card.weaknesses" :key="index">
                            <TcgType :type="weakness.type" size="large" />
                            <span class="ml-1 inline-block">{{ weakness.value }}</span>
                        </div>
                    </div>
                    <div v-else class="flex flex-1 items-center">
                        N/A
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="mb-4">
                        Resistances
                    </div>
                    <div v-if="card.resistances" class="flex flex-col gap-4">
                        <div v-for="(resistance, index) in card.resistances" :key="index">
                            <TcgType :type="resistance.type" size="large" />
                            <span class="ml-1 inline-block">{{ resistance.value }}</span>
                        </div>
                    </div>
                    <div v-else class="flex flex-1 items-center">
                        N/A
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="mb-4">
                        Retreat
                    </div>
                    <div v-if="card.retreat" class="flex flex-wrap gap-2">
                        <TcgType
                            v-for="n in card.retreat"
                            :key="n"
                            type="colorless"
                            size="large"
                            :showTooltip="false"
                        />
                    </div>
                    <div v-else class="flex flex-1 items-center">
                        N/A
                    </div>
                </div>
            </div>
        </UPageCard>
        <UPageCard v-if="card.abilities" variant="subtle" title="Abilities">
            <div v-for="(ability, index) in card.abilities" :key="index">
                <strong>{{ ability.type }} - {{ ability.name }}</strong>
                <div class="mt-1">
                    {{ parseTcgText(ability.effect) }}
                </div>
            </div>
        </UPageCard>
        <UPageCard v-if="card.attacks" variant="subtle" title="Attacks">
            <div v-for="(attack, index) in card.attacks" :key="index" class="border-muted not-last:border-b not-last:pb-4">
                <div class="flex items-center gap-2">
                    <div class="flex flex-wrap gap-1">
                        <TcgType
                            v-for="(cost, costIndex) in attack.cost"
                            :key="costIndex"
                            :type="cost"
                            size="small"
                        />
                    </div>
                    <strong class="flex-1 truncate">{{ attack.name }}</strong>
                    <strong class="ml-auto">{{ attack.damage }}</strong>
                </div>
                <div v-if="attack.effect" class="mt-2">
                    {{ parseTcgText(attack.effect) }}
                </div>
            </div>
        </UPageCard>
        <UPageCard v-if="card.item?.name" variant="subtle" title="Held item">
            <strong>{{ card.item.name }} - {{ card.item.effect }}</strong>
        </UPageCard>
        <UPageCard v-if="card.evolveFrom" variant="subtle" title="Evolutions">
            <div>
                <span>Evolves from </span>
                <ULink :to="{ name: 'cards', query: { name: card.evolveFrom } }">
                    {{ card.evolveFrom }}
                </ULink>
            </div>
        </UPageCard>
    </div>
</template>
