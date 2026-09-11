import type { H3Event } from 'h3';

import { PokenodeError } from 'pokenode-ts';

export default function sendPokenodeTsError(event: H3Event, error: unknown) {
    if (PokenodeError.isPokenodeError(error)) {
        return sendError(event, createError({
            statusCode: error.status,
            statusMessage: error.statusText,
        }));
    }

    return sendError(event, createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
    }));
}
