<script setup lang="ts">
useSeoMeta({
    title: 'TCG Sets',
    description: 'A list of all Pokémon TCG sets.',
});

const { data: series, pending, error } = useLazyFetch('/api/series');

const name = ref(getQueryValue('name'));
</script>

<template>
    <div class="mb-4 sm:mb-6 lg:mb-8">
        <UInput
            v-model="name"
            class="w-full"
            icon="i-lucide-search"
            placeholder="Search for a set"
            :disabled="pending"
            @update:modelValue="(value) => setQueryValue('name', value)"
        />
    </div>
    <template v-if="pending">
        <div class="grid gap-4 sm:gap-6 lg:gap-8">
            <div v-for="n in 2" :key="n" class="pb-4 sm:pb-6 lg:pb-8">
                <USkeleton class="mb-4 h-8 w-60" />
                <div class="list-grid">
                    <div v-for="m in 10" :key="m">
                        <USkeleton class="list-card" />
                        <USkeleton class="list-title h-6" />
                    </div>
                </div>
            </div>
        </div>
    </template>
    <UAlert v-else-if="error" color="error" :title="error.message" />
    <template v-else-if="series">
        <div v-if="series.length > 0" class="grid gap-4 sm:gap-6 lg:gap-8">
            <TcgSerieCard
                v-for="serie in series"
                :key="serie.id"
                :serie
                :name
            />
        </div>
        <UAlert v-else color="warning" :title="`No sets fond for: ${name}`" />
    </template>
</template>
