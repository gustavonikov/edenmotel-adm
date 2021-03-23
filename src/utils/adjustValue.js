export function adjustValue(value) {
    return Intl.NumberFormat(
        { style: 'currency', currency: 'BRL' }, { minimumFractionDigits: 2 }
    ).format(value);
}
