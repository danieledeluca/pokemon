export default defineMaybeCachedEventHandler(async (event) => {
    const cardId = getRouterParam(event, 'id');

    const card = await $fetch<TcgCard>(`${TCG_DEX_API_URL}/cards/${cardId}`);

    return card;
});
