<script setup lang="ts">
const { pokemonName, pokemonId, pokemonSpriteUrl, pending } = defineProps<{
    pokemonName?: string;
    pokemonId?: number;
    pokemonSpriteUrl?: string;
    pending?: boolean;
}>();
</script>

<template>
    <template v-if="pending">
        <div>
            <USkeleton class="aspect-square w-full" />
            <USkeleton class="mt-1 h-6 w-full" />
        </div>
    </template>
    <div v-else class="flex">
        <UTooltip :text="pokemonName" class="inline-block" :content="{ side: 'top' }">
            <div class="relative w-full">
                <NuxtLink :to="pokemonId ? `/pokemon/${pokemonId}` : undefined" class="pokemon-image">
                    <AppImage
                        :src="pokemonSpriteUrl"
                        :alt="pokemonName"
                        placeholder="/placeholders/egg.gif"
                    />
                </NuxtLink>
                <div class="pokemon-title">
                    {{ pokemonName }}
                </div>
                <slot />
            </div>
        </UTooltip>
    </div>
</template>
