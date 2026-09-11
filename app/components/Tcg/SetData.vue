<script setup lang="ts">
import type { Set } from '@tcgdex/sdk';

const { set } = defineProps <{
    set: Set;
}>();

const showSymbol = ref(true);
</script>

<template>
    <UCard variant="subtle">
        <div class="grid items-center gap-4 sm:gap-6 md:grid-cols-3">
            <div class="flex items-center justify-center">
                <AppImage
                    :src="set.logo ? `${set.logo}.png` : undefined"
                    :alt="set.name"
                    errorClass="p-4 sm:p-6"
                />
            </div>
            <div class="grid gap-4 md:col-span-2">
                <div>
                    <strong>Name </strong>
                    <span>{{ set.name }}</span>
                    <NuxtImg
                        v-if="set.symbol && showSymbol"
                        :src="`${set.symbol}.png`"
                        :alt="set.name"
                        class="ml-2 inline-block size-5"
                        @error="showSymbol = false"
                    />
                </div>
                <div>
                    <strong>Serie </strong>
                    <span>{{ set.serie.name }}</span>
                </div>
                <div>
                    <strong>Release date </strong>
                    <span>{{ formatDate(set.releaseDate) }}</span>
                </div>
                <div>
                    <strong>Total cards </strong>
                    <span>{{ set.cardCount.total }}</span>
                </div>
            </div>
        </div>
    </UCard>
</template>
