import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {
    PokemonSets,
    PokemonSet,
    PokemonCards,
    PokemonCard,
    PokemonSprite,
    PokeApiResponse,
    PokemonRegionResponse,
    PokemonRegion,
    PokeApiResult,
    ResponseStatus,
    PokemonData,
    PokemonSpriteTypes,
} from '@/models';
import { filterList } from '@/composables/pokemon';
import { parseLabel } from '@/composables/utils';

const POKEMON_TCG_API_URL = 'https://api.pokemontcg.io/v2/';
const POKE_API_URL = 'https://pokeapi.co/api/v2/';

const SPRITE_FRONT_DEFAULT_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const SPRITE_FRONT_SHINY_URL = `${SPRITE_FRONT_DEFAULT_URL}shiny/`;
const HOME_SPRITE_FRONT_DEFAULT_URL =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';
const HOME_SPRITE_FRONT_SHINY_URL = `${HOME_SPRITE_FRONT_DEFAULT_URL}shiny/`;
const OFFICIAL_ARTWORK_SPRITE_FRONT_DEFAULT_URL =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const OFFICIAL_ARTWORK_SPRITE_FRONT_SHINY_URL = `${OFFICIAL_ARTWORK_SPRITE_FRONT_DEFAULT_URL}shiny/`;
const SHOWDOWN_SPRITE_FRONT_DEFAULT_URL =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/';
const SHOWDOWN_SPRITE_FRONT_SHINY_URL = `${SHOWDOWN_SPRITE_FRONT_DEFAULT_URL}shiny/`;

function getNextUrl(url: string) {
    const apiUrl = new URL(url);
    const currentPage = parseInt(apiUrl.searchParams.get('page') || '1');

    apiUrl.searchParams.set('page', (currentPage + 1).toString());

    return apiUrl.href;
}

function getSpriteId(sprite: PokeApiResult) {
    const regex = /(pokemon|pokemon-species)\/(\d+)\//;

    return parseInt(sprite.url.match(regex)?.[2] || '0');
}

function getSprites(sprite: PokeApiResult): PokemonSpriteTypes {
    const spriteId = getSpriteId(sprite);

    return {
        'front-default': `${SPRITE_FRONT_DEFAULT_URL}${spriteId}.png`,
        'front-shiny': `${SPRITE_FRONT_SHINY_URL}${spriteId}.png`,
        'home-front-default': `${HOME_SPRITE_FRONT_DEFAULT_URL}${spriteId}.png`,
        'home-front-shiny': `${HOME_SPRITE_FRONT_SHINY_URL}${spriteId}.png`,
        'official-artwork-front-default': `${OFFICIAL_ARTWORK_SPRITE_FRONT_DEFAULT_URL}${spriteId}.png`,
        'official-artwork-front-shiny': `${OFFICIAL_ARTWORK_SPRITE_FRONT_SHINY_URL}${spriteId}.png`,
        'showdown-front-default': `${SHOWDOWN_SPRITE_FRONT_DEFAULT_URL}${spriteId}.gif`,
        'showdown-front-shiny': `${SHOWDOWN_SPRITE_FRONT_SHINY_URL}${spriteId}.gif`,
    };
}

export const usePokemonStore = defineStore('pokemon', () => {
    const defaultErrorMessage = 'There was an error, please try again';
    const responseStatus: ResponseStatus = {
        ok: false,
        isLoading: false,
        error: '',
        nextUrl: '',
    };
    const pokemonSets = ref<PokemonData<PokemonSet[]>>({
        responseStatus: { ...responseStatus },
        data: [],
    });
    const pokemonCardsBySet = ref<PokemonData<{ [setId: string]: PokemonCard[] }>>({
        responseStatus: { ...responseStatus },
        data: {},
    });
    const pokemonCards = ref<PokemonData<{ [cardId: string]: PokemonCard }>>({
        responseStatus: { ...responseStatus },
        data: {},
    });
    const pokemonCardsBySearch = ref<PokemonData<PokemonCard[]>>({
        responseStatus: { ...responseStatus },
        data: [],
    });
    const pokemonCardRarities = ref<string[]>([]);
    const pokemonCardTypes = ref<string[]>([]);
    const pokemonCardSubtypes = ref<string[]>([]);
    const pokemonSprites = ref<PokemonData<PokemonSprite[]>>({
        responseStatus: { ...responseStatus },
        data: [],
    });
    const pokemonSpriteTypes: { value: keyof PokemonSpriteTypes | ''; label: string }[] = [
        {
            value: '',
            label: 'Front default',
        },
        {
            value: 'front-default',
            label: 'Front shiny',
        },
        {
            value: 'home-front-default',
            label: 'Home front default',
        },
        {
            value: 'home-front-shiny',
            label: 'Home front shiny',
        },
        {
            value: 'official-artwork-front-default',
            label: 'Official artwork front default',
        },
        {
            value: 'official-artwork-front-shiny',
            label: 'Official artwork front shiny',
        },
        {
            value: 'showdown-front-default',
            label: 'Showdown front default',
        },
        {
            value: 'showdown-front-shiny',
            label: 'Showdown front shiny',
        },
    ];
    const pokemonRegions = ref<PokemonRegion[]>([]);

    async function getPokemonSets(url = '') {
        const apiUrl = new URL(url || `${POKEMON_TCG_API_URL}sets?orderBy=releaseDate&page=1`);

        pokemonSets.value.responseStatus.ok = false;
        pokemonSets.value.responseStatus.isLoading = true;
        pokemonSets.value.responseStatus.error = '';
        pokemonSets.value.responseStatus.nextUrl = '';

        try {
            const response = await fetch(apiUrl.href);

            if (response.ok) {
                const json = (await response.json()) as PokemonSets;

                pokemonSets.value.data.push(...(<PokemonSet[]>json.data));
                pokemonSets.value.responseStatus.ok = true;

                if (json.totalCount > pokemonSets.value.data.length) {
                    pokemonSets.value.responseStatus.nextUrl = getNextUrl(apiUrl.href);
                }
            } else {
                throw new Error('There was an error retrieving the sets, please try again');
            }
        } catch (error: Error | any) {
            if (error instanceof Error) {
                pokemonSets.value.responseStatus.error = error.message;
            } else {
                pokemonSets.value.responseStatus.error = defaultErrorMessage;
            }
        }

        pokemonSets.value.responseStatus.isLoading = false;
    }

    async function getPokemonCardsBySet(setId: string, url = '') {
        const apiUrl = new URL(url || `${POKEMON_TCG_API_URL}cards?q=set.id:${setId}&orderBy=number&page=1`);

        pokemonCardsBySet.value.responseStatus.ok = false;
        pokemonCardsBySet.value.responseStatus.isLoading = true;
        pokemonSets.value.responseStatus.error = '';
        pokemonCardsBySet.value.responseStatus.nextUrl = '';

        try {
            const response = await fetch(apiUrl.href);

            if (response.ok) {
                const json = (await response.json()) as PokemonCards;

                pokemonCardsBySet.value.data[setId] = <PokemonCard[]>json.data;
                pokemonCardsBySet.value.responseStatus.ok = true;

                if (json.totalCount > pokemonCardsBySet.value.data[setId].length) {
                    pokemonCardsBySet.value.responseStatus.nextUrl = getNextUrl(apiUrl.href);
                }
            } else {
                throw new Error('There was an error retrieving the cards, please try again');
            }
        } catch (error: Error | any) {
            if (error instanceof Error) {
                pokemonCardsBySet.value.responseStatus.error = error.message;
            } else {
                pokemonCardsBySet.value.responseStatus.error = defaultErrorMessage;
            }
        }

        pokemonCardsBySet.value.responseStatus.isLoading = false;
    }

    async function getPokemonCard(cardId: string) {
        pokemonCards.value.responseStatus.ok = false;
        pokemonCards.value.responseStatus.isLoading = true;
        pokemonSets.value.responseStatus.error = '';
        pokemonCards.value.responseStatus.nextUrl = '';

        try {
            const response = await fetch(`${POKEMON_TCG_API_URL}cards/${cardId}`);

            if (response.ok) {
                const json = (await response.json()) as PokemonCards;

                pokemonCards.value.data[cardId] = <PokemonCard>json.data;
                pokemonCards.value.responseStatus.ok = true;
            } else {
                throw new Error('There was an error retrieving the card data, please try again');
            }
        } catch (error: Error | any) {
            if (error instanceof Error) {
                pokemonCards.value.responseStatus.error = error.message;
            } else {
                pokemonCards.value.responseStatus.error = defaultErrorMessage;
            }
        }

        pokemonCards.value.responseStatus.isLoading = false;
    }

    async function getPokemonCardsBySearch(
        cardName: string,
        cardRarity: string = '',
        cardType: string = '',
        cardSubtype: string = '',
        url = '',
        previousCards: PokemonCard[] = []
    ) {
        const apiUrl = new URL(
            url ||
                `${POKEMON_TCG_API_URL}cards?q=name:"*${cardName}*" rarity:"*${cardRarity}*" types:"*${cardType}*" subtypes:"*${cardSubtype}*"&orderBy=set.releaseDate,number&page=1`
        );

        pokemonCardsBySearch.value.responseStatus.ok = previousCards.length ? true : false;
        pokemonCardsBySearch.value.responseStatus.isLoading = true;
        pokemonCardsBySearch.value.responseStatus.error = '';
        pokemonCardsBySearch.value.responseStatus.nextUrl = '';
        pokemonCardsBySearch.value.data = [...previousCards];

        try {
            const response = await fetch(apiUrl.href);

            if (response.ok) {
                const json = (await response.json()) as PokemonCards;

                pokemonCardsBySearch.value.data.push(...(<PokemonCard[]>json.data));
                pokemonCardsBySearch.value.responseStatus.ok = true;

                if (json.totalCount > pokemonCardsBySearch.value.data.length) {
                    pokemonCardsBySearch.value.responseStatus.nextUrl = getNextUrl(apiUrl.href);
                } else {
                    pokemonCardsBySearch.value.responseStatus.nextUrl = '';
                }
            } else {
                throw new Error('There was an error retrieving the cards, please try again');
            }
        } catch (error: Error | any) {
            if (error instanceof Error) {
                pokemonCardsBySearch.value.responseStatus.error = error.message;
            } else {
                pokemonCardsBySearch.value.responseStatus.error = defaultErrorMessage;
            }
        }

        pokemonCardsBySearch.value.responseStatus.isLoading = false;
    }

    async function getPokemonCardRarities() {
        const response = await fetch(`${POKEMON_TCG_API_URL}rarities`);

        if (response.ok) {
            const json = (await response.json()) as { data: string[] };

            pokemonCardRarities.value = json.data;
        }
    }

    async function getPokemonCardTypes() {
        const response = await fetch(`${POKEMON_TCG_API_URL}types`);

        if (response.ok) {
            const json = (await response.json()) as { data: string[] };

            pokemonCardTypes.value = json.data;
        }
    }

    async function getPokemonCardSubtypes() {
        const response = await fetch(`${POKEMON_TCG_API_URL}subtypes`);

        if (response.ok) {
            const json = (await response.json()) as { data: string[] };

            pokemonCardSubtypes.value = json.data;
        }
    }

    async function getPokemonSprites(
        spriteName = '',
        spriteRegion = '',
        url = '',
        previousSprites: PokemonSprite[] = []
    ) {
        const apiUrl = new URL(url || `${POKE_API_URL}pokemon/`);

        if (spriteName || spriteRegion) {
            apiUrl.searchParams.set('limit', '10000');
        }

        pokemonSprites.value.responseStatus.ok = previousSprites.length ? true : false;
        pokemonSprites.value.responseStatus.isLoading = true;
        pokemonSprites.value.responseStatus.error = '';
        pokemonSprites.value.responseStatus.nextUrl = '';
        pokemonSprites.value.data = [...previousSprites];

        if (!pokemonRegions.value.length) {
            await getPokemonRegions();
        }

        if (spriteRegion) {
            const regexp = new RegExp(spriteRegion, 'i');
            const currentRegion = pokemonRegions.value.find((region) => region.name.match(regexp));

            if (currentRegion) {
                pokemonSprites.value.data = filterList(spriteName, currentRegion.sprites);
                pokemonSprites.value.responseStatus.ok = true;
                pokemonSprites.value.responseStatus.isLoading = false;
            }
        } else {
            try {
                const response = await fetch(apiUrl.href);

                if (response.ok) {
                    const json = (await response.json()) as PokeApiResponse;
                    const sprites = filterList(spriteName, json.results);

                    pokemonSprites.value.data.push(
                        ...sprites.map((sprite) => {
                            return {
                                id: getSpriteId(sprite),
                                name: parseLabel(sprite.name),
                                sprites: getSprites(sprite),
                            };
                        })
                    );

                    pokemonSprites.value.responseStatus.ok = true;
                    pokemonSprites.value.responseStatus.nextUrl = json.next;
                } else {
                    throw new Error('There was an error retrieving the sprites, please try again');
                }
            } catch (error: Error | any) {
                if (error instanceof Error) {
                    pokemonSprites.value.responseStatus.error = error.message;
                } else {
                    pokemonSprites.value.responseStatus.error = defaultErrorMessage;
                }
            }
        }

        pokemonSprites.value.responseStatus.isLoading = false;
    }

    async function getPokemonRegions() {
        const response = await fetch(`${POKE_API_URL}generation?limit=10000`);

        if (response.ok) {
            const json = (await response.json()) as PokeApiResponse;
            const regionsUrls = json.results.map((region) => region.url);

            pokemonRegions.value = await Promise.all(
                regionsUrls.map(async (url) => {
                    const response = await fetch(url);
                    const json = (await response.json()) as PokemonRegionResponse;

                    return {
                        id: json.id,
                        name: parseLabel(json.main_region.name),
                        sprites: json.pokemon_species
                            .map((sprite) => {
                                return {
                                    id: getSpriteId(sprite),
                                    name: parseLabel(sprite.name),
                                    sprites: getSprites(sprite),
                                };
                            })
                            .sort((a, b) => a.id - b.id),
                    };
                })
            );
        }
    }

    return {
        pokemonSets,
        pokemonCardsBySet,
        pokemonCards,
        pokemonCardsBySearch,
        pokemonCardRarities,
        pokemonCardTypes,
        pokemonCardSubtypes,
        pokemonSprites,
        pokemonSpriteTypes,
        pokemonRegions,
        getPokemonSets,
        getPokemonCardsBySet,
        getPokemonCard,
        getPokemonCardsBySearch,
        getPokemonCardRarities,
        getPokemonCardTypes,
        getPokemonCardSubtypes,
        getPokemonSprites,
        getPokemonRegions,
    };
});
