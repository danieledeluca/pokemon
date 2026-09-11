import type { H3Event } from 'h3';

export default function sendTcgDexError(event: H3Event, error: unknown) {
    return sendError(event, createError({
        statusCode: 500,
        statusMessage: (error as Error).message || 'Internal Server Error',
    }));
}
