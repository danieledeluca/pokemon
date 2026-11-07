import type { FormFieldProps, SelectMenuProps } from '@nuxt/ui';

type FilterField<T> = {
    formFieldProps: Omit<FormFieldProps, 'name'> & { name: string & keyof T };
    selectMenuProps: SelectMenuProps;
};

export const useCardsFilters = defineStore('cardsFilters', () => {
    const { data: types, pending: typesPending } = useLazyFetch('/api/cards/filters/types');
    const { data: retreats, pending: retreatsPending } = useLazyFetch('/api/cards/filters/retreats');
    const { data: illustrators, pending: illustratorsPending } = useLazyFetch('/api/cards/filters/illustrators');
    const { data: hps, pending: hpsPending } = useLazyFetch('/api/cards/filters/hps');
    const { data: categories, pending: categoriesPending } = useLazyFetch('/api/cards/filters/categories');
    const { data: energyTypes, pending: energyTypesPending } = useLazyFetch('/api/cards/filters/energyTypes');
    // eslint-disable-next-line style/max-len
    const { data: regulationMarks, pending: regulationMarksPending } = useLazyFetch('/api/cards/filters/regulationMarks');
    const { data: stages, pending: stagesPending } = useLazyFetch('/api/cards/filters/stages');
    const { data: suffixes, pending: suffixesPending } = useLazyFetch('/api/cards/filters/suffixes');
    const { data: trainerTypes, pending: trainerTypesPending } = useLazyFetch('/api/cards/filters/trainerTypes');

    const filtersLabels: Record<keyof CardsFilters, string> = {
        name: 'Name',
        type: 'Type',
        retreat: 'Retreat Cost',
        illustrator: 'Illustrator',
        hp: 'HP',
        category: 'Category',
        energyType: 'Energy Type',
        regulationMark: 'Regulation Mark',
        stage: 'Stage',
        suffix: 'Suffix',
        trainerType: 'Trainer Type',
    };

    const filtersFields = computed<FilterField<CardsFilters>[]>(() => {
        return [
            {
                formFieldProps: {
                    name: 'type',
                    label: filtersLabels.type,
                },
                selectMenuProps: {
                    items: types.value,
                    loading: typesPending.value,
                    placeholder: 'Select a type',
                    icon: 'i-lucide-shapes',
                },
            },
            {
                formFieldProps: {
                    name: 'retreat',
                    label: filtersLabels.retreat,
                },
                selectMenuProps: {
                    items: retreats.value,
                    loading: retreatsPending.value,
                    placeholder: 'Select a retreat cost',
                    icon: 'i-lucide-undo-2',
                },
            },
            {
                formFieldProps: {
                    name: 'illustrator',
                    label: filtersLabels.illustrator,
                },
                selectMenuProps: {
                    items: illustrators.value,
                    loading: illustratorsPending.value,
                    placeholder: 'Select an illustrator',
                    icon: 'i-lucide-brush',
                },
            },
            {
                formFieldProps: {
                    name: 'hp',
                    label: filtersLabels.hp,
                },
                selectMenuProps: {
                    items: hps.value,
                    loading: hpsPending.value,
                    placeholder: 'Select a hp',
                    icon: 'i-lucide-heart',
                },
            },
            {
                formFieldProps: {
                    name: 'category',
                    label: filtersLabels.category,
                },
                selectMenuProps: {
                    items: categories.value,
                    loading: categoriesPending.value,
                    placeholder: 'Select a category',
                    icon: 'i-lucide-tag',
                },
            },
            {
                formFieldProps: {
                    name: 'energyType',
                    label: filtersLabels.energyType,
                },
                selectMenuProps: {
                    items: energyTypes.value,
                    loading: energyTypesPending.value,
                    placeholder: 'Select an energy type',
                    icon: 'i-lucide-zap',
                },
            },
            {
                formFieldProps: {
                    name: 'regulationMark',
                    label: filtersLabels.regulationMark,
                },
                selectMenuProps: {
                    items: regulationMarks.value,
                    loading: regulationMarksPending.value,
                    placeholder: 'Select a regulation mark',
                    icon: 'i-lucide-shield-check',
                },
            },
            {
                formFieldProps: {
                    name: 'stage',
                    label: filtersLabels.stage,
                },
                selectMenuProps: {
                    items: stages.value,
                    loading: stagesPending.value,
                    placeholder: 'Select a stage',
                    icon: 'i-lucide-git-branch',
                },
            },
            {
                formFieldProps: {
                    name: 'suffix',
                    label: filtersLabels.suffix,
                },
                selectMenuProps: {
                    items: suffixes.value,
                    loading: suffixesPending.value,
                    placeholder: 'Select a suffix',
                    icon: 'i-lucide-text-initial',
                },
            },
            {
                formFieldProps: {
                    name: 'trainerType',
                    label: filtersLabels.trainerType,
                },
                selectMenuProps: {
                    items: trainerTypes.value,
                    loading: trainerTypesPending.value,
                    placeholder: 'Select a trainer type',
                    icon: 'i-lucide-clipboard-list',
                },
            },
        ];
    });

    return {
        filtersLabels,
        filtersFields,
    };
});
