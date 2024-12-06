export function parseLabel(text: string) {
    return (text.charAt(0).toUpperCase() + text.slice(1)).replace(/-/g, ' ');
}

export function setSearchParam(key: string, value: string) {
    const newUrl = new URL(window.location.href);

    if (value) {
        newUrl.searchParams.set(key, value.toString().trim());
    } else {
        newUrl.searchParams.delete(key);
    }

    window.history.replaceState(window.history.state, '', newUrl);
}

export function getSearchParam(key: string) {
    return new URLSearchParams(window.location.search).get(key) || '';
}

export function isInViewport(_element: string | HTMLElement, _scrollPosition: number, _header: string | HTMLElement) {
    const element = typeof _element === 'string' ? (document.querySelector(_element) as HTMLElement) : _element;
    const header = typeof _header === 'string' ? (document.querySelector(_header) as HTMLElement) : _header;
    const headerStyle = getComputedStyle(header);

    if (element) {
        const headerHeight = ['fixed', 'sticky'].includes(headerStyle.position) ? header.offsetHeight || 0 : 0;

        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        const scrollPosition = _scrollPosition + headerHeight;
        const viewportBottom = scrollPosition + window.innerHeight - headerHeight;

        return elementBottom > scrollPosition && elementTop < viewportBottom;
    }

    return false;
}

export function getImageUrl(path: string) {
    return new URL(`/src/assets/${path}`, import.meta.url).href;
}
