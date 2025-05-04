const euroFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});

export function toCurrency(num: number) : string {
    return euroFormatter.format(num);
}