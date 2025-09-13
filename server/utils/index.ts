import type { EventHandlerRequest, H3Event } from 'h3';

export function defineMaybeCachedEventHandler<T>(
    handler: (event: H3Event<EventHandlerRequest>) => T | Promise<T>,
) {
    if (import.meta.dev) {
        return defineEventHandler(handler);
    }

    return defineCachedEventHandler(handler, {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    });
}
