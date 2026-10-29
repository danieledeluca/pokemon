import type { z } from 'zod';

import { refDebounced } from '@vueuse/core';

export function useQueryState<T extends z.ZodType>(schema: T, defaultState: z.core.output<T>) {
    type State = z.core.output<T> & object;

    const route = useRoute();
    const { setQueryValues } = useQuery();

    const parsedState = schema.safeParse(route.query);
    const state = reactive<State>(parsedState.success ? parsedState.data as State : defaultState as State);
    const debouncedState = refDebounced(computed(() => ({ ...state })), 500);

    watch(debouncedState, (newValue) => {
        const values = Object.fromEntries(Object.entries(newValue).map(([key, value]) => {
            return [
                key,
                value === defaultState[key as keyof State]
                    ? undefined
                    : value,
            ];
        }));

        setQueryValues({
            ...values,
            page: undefined,
        });
    });

    return {
        state,
        debouncedState,
    };
}
