import { PokenodeError } from 'pokenode-ts';

export default function sendPokenodeTsError(error: unknown) {
    if (PokenodeError.isPokenodeError(error)) {
        throw createError({
            statusCode: error.status,
            message: error.statusText,
        });
    }

    throw createError({
        statusCode: 500,
        message: 'Internal Server Error',
    });
}
