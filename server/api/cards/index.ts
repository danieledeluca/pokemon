import axios from 'axios';
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export default defineCachedEventHandler(
    async (event) => {
        const query = getQuery(event);

        const params: PokemonTCG.Parameter = {
            ...query,
            pageSize: POKEMON_TCG_CARDS_PAGE_SIZE,
        };

        try {
            const response = await axios.get<PokemonTCGResponse<PokemonTCG.Card>>(
                `${POKEMON_TCG_API_URL}/cards`,
                { params },
            );

            return response.data;
        } catch (e) {
            const error = e as Error;
            Promise.reject(error);
        }
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
