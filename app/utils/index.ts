export function formatDate(date: string) {
    return Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(new Date(date));
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

export function groupBy<T>(array: T[] | undefined, _key: keyof T) {
    return array?.reduce<Record<string, T[]>>((acc, item) => {
        const key = item[_key] as string;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);

        return acc;
    }, {});
}

export function getImage(path: string) {
    const assets = import.meta.glob('~/assets/images/**/*', {
        eager: true,
        import: 'default',
    });

    return assets[`/assets/images/${path}`] as string;
}

export function parseName(name: string) {
    return name.slice(0, 1).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}
