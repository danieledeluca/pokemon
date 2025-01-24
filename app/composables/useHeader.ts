export default function useHeader() {
    const headerHeight = ref(0);

    const updateHeaderHeight = () => {
        const header = document.querySelector('header');

        if (header) {
            headerHeight.value =
                window.getComputedStyle(header).position === 'sticky' ? header.offsetHeight : 0;
        }
    };

    onMounted(() => {
        window.addEventListener('resize', updateHeaderHeight);

        window.dispatchEvent(new Event('resize'));
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateHeaderHeight);
    });

    return {
        headerHeight,
    };
}
