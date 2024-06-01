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

export const gcd = (...numbers: number[]): number => {
    const _gcd = (a: number, b: number): number => {
        return b === 0 ? a : _gcd(b, a % b);
    };

    return numbers.reduce((acc, val) => _gcd(acc, val));
};
