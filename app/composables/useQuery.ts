import type { LocationQueryRaw } from 'vue-router';

export function useQuery() {
    const router = useRouter();
    const route = useRoute();

    function getQueryValue(key: string) {
        return route.query[key]?.toString() || undefined;
    }

    function setQueryValue(key: string, value?: string) {
        setQueryValues({ [key]: value });
    }

    function setQueryValues(values: Record<string, string | undefined>) {
        const query: LocationQueryRaw = { ...route.query };

        Object.entries(values).forEach(([key, value]) => {
            query[key] = value || undefined;
        });

        router.replace({ query });
    }

    return {
        getQueryValue,
        setQueryValue,
        setQueryValues,
    };
}
