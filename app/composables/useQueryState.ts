import type { Reactive } from 'vue';
import type { z } from 'zod';

export function useQueryState<T extends z.ZodType>(schema: T, defaultState: z.core.output<T>, resetPage = false) {
    type State = z.core.output<T> & object;

    const route = useRoute();
    const { setQueryValues } = useQuery();

    const parsedState = schema.safeParse(route.query);
    const state = reactive<State>(parsedState.success ? parsedState.data as State : defaultState as State);

    function parseStateValues(state: State | Reactive<State>) {
        return Object.fromEntries(Object.entries(state).map(([key, value]) => {
            return [
                key,
                value === defaultState[key as keyof State]
                    ? undefined
                    : value,
            ];
        }));
    }

    watch(state, (newState) => {
        const values = parseStateValues(newState);

        if (resetPage) {
            values.page = undefined;
        }

        setQueryValues(values);
    });

    return {
        state,
    };
}
