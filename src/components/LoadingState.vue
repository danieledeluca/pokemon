<script setup lang="ts">
import type { ResponseStatus } from '@/models';

const props = defineProps<{
    responseStatus: ResponseStatus;
}>();

const emit = defineEmits<{
    loadMore: [];
}>();
</script>

<template>
    <div v-if="props.responseStatus.isLoading || props.responseStatus.nextUrl" class="loading-state">
        <div v-if="props.responseStatus.isLoading" class="loading" aria-busy="true">
            <span>Loading...</span>
        </div>
        <div v-if="props.responseStatus.nextUrl" class="load-more">
            <button @click="emit('loadMore')" type="button">
                <span>Load more</span>
            </button>
        </div>
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
