import type { FetchError } from 'ofetch';

import type { NuxtError } from '#app';

export function getFetchErrorMessage(error: NuxtError | FetchError) {
    return error.data?.message || error.message || 'An unexpected error occurred. Please try again later.';
}
