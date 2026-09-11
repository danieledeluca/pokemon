export function kebabToCapital(text: string) {
    return toCapital(text.replace(/-/g, ' '));
}

export function toCapital(text: string) {
    return text.split(' ')
        .map((value) => value.slice(0, 1).toUpperCase() + value.slice(1))
        .join(' ');
}
