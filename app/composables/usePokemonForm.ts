import type { NamedAPIResource } from 'pokenode-ts';

export default async function usePokemonForm(pokemonForm: NamedAPIResource) {
    const { data: form, error } = await useFetch('/api/pokemon/form', {
        query: {
            formName: pokemonForm.name,
        },
    });

    if (error.value) {
        throw createError({
            statusCode: error.value?.statusCode,
            statusMessage: error.value?.message,
        });
    }

    return {
        form,
    };
}
