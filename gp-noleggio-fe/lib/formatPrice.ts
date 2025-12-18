export function formatPrice(price: number | string, showCurrency: boolean = true): string {
    let numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) {
        numericPrice = 0;
    }

    // Se siamo nel server, usa formattazione manuale
    if (typeof window === 'undefined') {
        const parts = numericPrice.toString().split('.');
        const integerPart = parts[0];
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return showCurrency ? `${formattedInteger}\u00A0€` : formattedInteger;
    }

    // Se siamo nel client, usa Intl.NumberFormat
    const numberFormat = new Intl.NumberFormat('de-DE', {
        style: showCurrency ? 'currency' : 'decimal',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    let formattedPrice = numberFormat.format(numericPrice);

    if (!showCurrency) {
        formattedPrice = formattedPrice.replace(/[€\s]/g, '').trim();
    }

    return formattedPrice;
}
