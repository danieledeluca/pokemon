export function getIdFromUrl(url: string | undefined) {
    return Number(url?.split('/').at(-2));
}
