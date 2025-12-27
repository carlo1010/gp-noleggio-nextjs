export function formatPrice(
    price: number | string,
    showCurrency: boolean = true,
    rounded: boolean = false
): string {
    let numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numericPrice)) {
        numericPrice = 0;
    }

    // Se rounded è true, arrotonda il numero
    if (rounded) {
        numericPrice = Math.round(numericPrice);
    }

    const minimumFractionDigits = rounded ? 0 : 2;
    const maximumFractionDigits = rounded ? 0 : 2;

    // Server-side (no Intl)
    if (typeof window === 'undefined') {
        const formatted = numericPrice.toFixed(maximumFractionDigits);
        const [integerPart, decimalPart] = formatted.split('.');
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        const result = decimalPart
            ? `${formattedInteger},${decimalPart}`
            : formattedInteger;

        return showCurrency ? `${result}\u00A0€` : result;
    }

    // Client-side
    const numberFormat = new Intl.NumberFormat('de-DE', {
        style: showCurrency ? 'currency' : 'decimal',
        currency: 'EUR',
        minimumFractionDigits,
        maximumFractionDigits
    });

    let formattedPrice = numberFormat.format(numericPrice);

    if (!showCurrency) {
        formattedPrice = formattedPrice.replace(/[€\s]/g, '').trim();
    }

    return formattedPrice;
}
