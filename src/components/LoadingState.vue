<script setup lang="ts">
import type { ResponseStatus } from '@/utils/models';

const props = defineProps<{
    responseStatus: ResponseStatus;
}>();

const emit = defineEmits<{
    loadMore: [];
}>();
</script>

<template>
    <div
        v-if="props.responseStatus.isLoading || props.responseStatus.nextUrl"
        class="loading-state"
    >
        <button
            @click="emit('loadMore')"
            type="button"
            class="secondary"
            :aria-busy="props.responseStatus.isLoading"
            :disabled="props.responseStatus.isLoading"
        >
            <span v-if="props.responseStatus.isLoading">Loading...</span>
            <span v-else>Load more</span>
        </button>
    </div>
</template>

<style scoped>
form + .loading-state {
    margin-top: 0;
}

.loading-state {
    margin-top: 2rem;
    text-align: center;
}

.loading-state button {
    margin-bottom: 0;
}
</style>
