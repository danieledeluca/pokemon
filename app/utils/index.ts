export function formatDate(date: string) {
    return Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(new Date(date));
}

export function formatPrice(price: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(price);
}

export function getImage(path: string) {
    const assets = import.meta.glob('~/assets/images/**/*', {
        eager: true,
        import: 'default',
    });

    return assets[`/assets/images/${path}`] as string;
}

export function parseName(name: string | undefined) {
    if (!name) return '';

    return name.slice(0, 1).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}
