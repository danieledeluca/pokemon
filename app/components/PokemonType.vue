<script setup lang="ts">
const { type } = defineProps<{
    type: string;
}>();
</script>

<template>
    <small class="type" :class="type">
        {{ parseName(type) }}
    </small>
</template>

<style scoped>
.type {
    display: inline-block;
    padding: 0.125rem 0.25rem;
    min-width: 75px;
    background-color: var(--background-color);
    color: var(--color, var(--pico-color-dark));
    border-radius: var(--pico-border-radius);
    text-align: center;
    font-weight: 500;
}

.type:not(:last-child) {
    margin-right: 0.25rem;
}

.type.normal {
    --background-color: #919aa1;
}

.type.fighting {
    --background-color: #cf466b;
}

.type.flying {
    --background-color: #91a8db;
}

.type.poison {
    --background-color: #ac6cc4;
}

.type.ground {
    --background-color: #d97b4d;
}

.type.rock {
    --background-color: #c4b790;
}

.type.bug {
    --background-color: #8ec145;
}

.type.ghost {
    --background-color: #5568a9;
    --color: var(--pico-color-light);
}

.type.steel {
    --background-color: #5a8da0;
}

.type.fire {
    --background-color: #ff9f5f;
}

.type.water {
    --background-color: #548fd2;
}

.type.grass {
    --background-color: #5ebb63;
}

.type.electric {
    --background-color: #f2d354;
}

.type.psychic {
    --background-color: #fb757b;
}

.type.ice {
    --background-color: #71cdc0;
}

.type.dragon {
    --background-color: #1c6cbe;
    --color: var(--pico-color-light);
}

.type.dark {
    --background-color: #5a5464;
    --color: var(--pico-color-light);
}
.type.fairy {
    --background-color: #ee91e2;
}
</style>
