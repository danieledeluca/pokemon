<script setup lang="ts">
import type { SerieResume } from '@tcgdex/sdk';

const { serie: serieResume, name } = defineProps <{
    serie: SerieResume;
    name: string;
}>();

const { data: serie, pending, error } = useLazyFetch(`/api/series/${serieResume.id}`);

const sets = computed(() => {
    return serie.value?.sets.filter((set) => set.name.toLowerCase().includes(name.trim().toLowerCase()));
});
const showSerie = computed(() => {
    if (pending.value) {
        return true;
    }

    return sets.value && sets.value.length > 0;
});
</script>

<template>
    <UPageCard
        v-if="showSerie"
        variant="naked"
        :title="serieResume.name"
        class="border-default not-last:border-b not-last:pb-4 sm:not-last:pb-6 lg:not-last:pb-8"
        :ui="{
            title: 'text-2xl',
        }"
    >
        <template v-if="pending">
            <div class="pb-4 sm:pb-6 lg:pb-8">
                <div class="list-grid">
                    <div v-for="n in 10" :key="n">
                        <USkeleton class="list-card" />
                        <USkeleton class="list-title h-6" />
                    </div>
                </div>
            </div>
        </template>
        <UAlert v-else-if="error" color="error" :title="error.message" />
        <template v-else-if="serie">
            <div class="list-grid">
                <div v-for="set in sets" :key="set.id">
                    <NuxtLink :to="`/sets/${set.id}`" :title="set.name">
                        <UCard variant="soft" class="list-card">
                            <AppImage :src="set.logo ? `${set.logo}.png` : undefined" :alt="set.name" />
                        </UCard>
                    </NuxtLink>
                    <div class="list-title">
                        {{ set.name }}
                    </div>
                </div>
            </div>
        </template>
    </UPageCard>
</template>
