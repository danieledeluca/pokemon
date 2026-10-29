<script setup lang="ts">
import type { Set } from '@tcgdex/sdk';

const { set } = defineProps <{
    set: Set;
}>();
</script>

<template>
    <div class="flex gap-4 max-md:flex-col sm:gap-6">
        <div class="flex items-center justify-center md:flex-1">
            <AppImage :src="set.logo ? `${set.logo}.png` : undefined" :alt="set.name" class="md:max-h-55" />
        </div>
        <UPageCard
            variant="subtle"
            :title="set.name"
            class="md:flex-2"
            :ui="{ body: 'w-full', title: 'text-2xl max-md:text-center' }"
        >
            <div class="data-table">
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-layers" />
                        <span>Serie</span>
                    </div>
                    <span>{{ set.serie.name }}</span>
                </div>
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-playing-cards-fan" />
                        <span>Total cards</span>
                    </div>
                    <span>{{ set.cardCount.total }}</span>
                </div>
                <div class="data-table-item">
                    <div class="data-table-label">
                        <UIcon name="i-lucide-calendar" />
                        <span>Released date</span>
                    </div>
                    <span>{{ formatDate(set.releaseDate, { dateStyle: 'medium' }) }}</span>
                </div>
            </div>
        </UPageCard>
    </div>
</template>
