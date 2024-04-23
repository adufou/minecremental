type numberDisplayMode = 'normal' | 'engineering';

const displayNormal = (value: number): string => {
    return value.toPrecision(3);
};

export const display = (
    value: number | undefined,
    mode: numberDisplayMode = 'normal',
): string => {
    if (value !== undefined) {
        switch (mode) {
            case 'normal':
                return displayNormal(value);
        }
    }

    return '';
};
