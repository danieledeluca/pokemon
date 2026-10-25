<script setup lang="ts">
const { card } = defineProps <{
    card: TcgCard;
}>();
</script>

<template>
    <div class="space-y-4 sm:space-y-6 lg:space-y-8">
        <UPageCard
            variant="subtle"
            :ui="{
                body: 'w-full',
                title: 'flex items-center justify-between gap-2',
            }"
        >
            <template #title>
                <div class="text-2xl font-semibold text-pretty text-highlighted">
                    {{ card.name }}
                </div>
                <div v-if="card.types" class="flex gap-1 align-middle">
                    <TcgType
                        v-for="(type, index) in card.types"
                        :key="index"
                        :type
                        size="small"
                    />
                </div>
            </template>
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
            <div class="data-table">
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-layers" />
                        <span>Set</span>
                    </div>
                    <ULink :to="`/sets/${card.set.id}`">
                        <span>{{ card.set.name }}</span>
                    </ULink>
                </div>
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-hash" />
                        <span>No</span>
                    </div>
                    <!-- eslint-disable-next-line style/max-len -->
                    <span>{{ card.localId.padStart(card.set.cardCount.total.toString().length, '0') }}/{{ card.set.cardCount.total }}</span>
                </div>
                <div v-if="card.hp" class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-heart" />
                        <span>HP</span>
                    </div>
                    <span>{{ card.hp }}</span>
                </div>
                <div v-if="card.level" class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-zap" />
                        <span>Level</span>
                    </div>
                    <span>{{ card.level }}</span>
                </div>
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-sparkles" />
                        <span>Rarity</span>
                    </div>
                    <span>{{ card.rarity }}</span>
                </div>
                <div v-if="card.illustrator" class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-brush" />
                        <span>Illustrator</span>
                    </div>
                    <span class="italic">{{ card.illustrator }}</span>
                </div>
                <div v-if="card.regulationMark" class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-scale" />
                        <span>Regulation mark</span>
                    </div>
                    <span class="flex aspect-square w-6 items-center justify-center rounded-md bg-default p-1 text-xs font-medium ring ring-accented">
                        {{ card.regulationMark }}
                    </span>
                </div>
            </div>
        </UPageCard>
        <UPageCard
            v-if="card.weaknesses || card.resistances || card.retreat"
            variant="subtle"
            title="Battle traits"
        >
            <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
                <div>
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
                <div>
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
                <div>
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
        <UPageCard v-if="card.pricing.cardmarket" variant="subtle" title="Cardmarket">
            <div class="grid grid-cols-3 gap-4 sm:gap-6">
                <div v-for="(price, label, index) in parseCardMarketPrices(card.pricing.cardmarket)" :key="index">
                    <div class="mb-4">
                        {{ label }}
                    </div>
                    <div class="font-bold">
                        {{ price }}
                    </div>
                </div>
            </div>
        </UPageCard>
    </div>
</template>
