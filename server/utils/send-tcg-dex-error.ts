export default function sendTcgDexError(error: unknown) {
    throw createError({
        statusCode: 500,
        message: (error as Error).message || 'Internal Server Error',
    });
}
