export function parseTcgText(text: string) {
    const map = {
        '{G}': 'Grass',
        '{R}': 'Fire',
        '{W}': 'Water',
        '{L}': 'Lightning',
        '{P}': 'Psychic',
        '{M}': 'Metal',
        '{C}': 'Colorless',
        '{F}': 'Fighting',
        '{D}': 'Darkness',
    };

    return text.replace(/\{[GRWLPMCFD]\}/g, (match) => {
        return map[match as keyof typeof map] || match;
    });
}
