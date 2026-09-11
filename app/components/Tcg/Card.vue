<script setup lang="ts">
import type { CardResume } from '@tcgdex/sdk';

const { card } = defineProps<{
    card: CardResume;
}>();
</script>

<template>
    <div>
        <NuxtLink :to="`/cards/${card.id}`" class="flex aspect-card-low items-center justify-center">
            <AppImage
                :src="card.image ? `${card.image}/low.png` : undefined"
                :alt="card.name"
                class="w-full"
                placeholder="/card-back-low.png"
                errorClass="p-4 sm:p-6"
            />
        </NuxtLink>
        <div class="list-title">
            {{ card.name }}
        </div>
    </div>
</template>
