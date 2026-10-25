<script setup lang="ts">
import type { Set } from '@tcgdex/sdk';

const { set } = defineProps <{
    set: Set;
}>();
</script>

<template>
    <div class="grid items-center gap-4 sm:gap-6 md:grid-cols-3">
        <AppImage
            :src="set.logo ? `${set.logo}.png` : undefined"
            :alt="set.name"
            errorClass="p-4 sm:p-6"
        />
        <UPageCard
            variant="subtle"
            :title="set.name"
            class="md:col-span-2"
            :ui="{
                body: 'w-full',
                title: 'text-2xl max-md:text-center',
            }"
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
                    <span>{{ formatDate(set.releaseDate) }}</span>
                </div>
            </div>
        </UPageCard>
    </div>
</template>
