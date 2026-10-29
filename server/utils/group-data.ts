export function groupData<T, U>(data: T[], parseItem: (item: T) => U) {
    return data.reduce<U[][]>((acc, item, index) => {
        const chunkIndex = Math.floor(index / PAGINATION_ITEM_PER_PAGE);

        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }

        acc[chunkIndex].push(parseItem(item));

        return acc;
    }, []);
}
