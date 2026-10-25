export function formatDate(date: string) {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(new Date(date));
}

export function formatPrice(price: number, currency: string = 'EUR') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(price);
}
