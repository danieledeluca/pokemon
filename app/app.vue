<script setup lang="ts">
useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} | Pokémon Vault`
            : 'Pokémon Vault';
    },
    // eslint-disable-next-line style/max-len
    description: 'Pokemon Vault is a free online database for the Pokémon Trading Card Game and Pokédex — browse every set, search all cards, and explore Pokémon sprites, types and evolutions.',
});
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
