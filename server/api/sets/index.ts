import type { Serie, SerieResume, SetResume } from '@tcgdex/sdk';

export default defineMaybeCachedEventHandler(async (event) => {
    const query = getQuery(event);

    const sets = await $fetch<SetResume[]>(`${TCG_DEX_API_URL}/sets`, {
        query: {
            name: query.name,
        },
    });
    const setsIds = sets.map((set) => set.id);

    const series = await $fetch<SerieResume[]>(`${TCG_DEX_API_URL}/series`);
    const seriesPromises = series.map((serie) =>
        $fetch<Serie>(`${TCG_DEX_API_URL}/series/${serie.id}`),
    );
    const setsBySeries = await Promise.all(seriesPromises);

    return setsBySeries
        .filter((serie) => {
            serie.sets = serie.sets.filter((set) => setsIds.includes(set.id)) || [];
            serie.sets.reverse();
            return serie.sets.length > 0;
        })
        .reverse();
});
