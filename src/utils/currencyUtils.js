export const currencyFormat = (num) => {
    if (!num) {
        return 'R$ 0,00';
    }

    return (
        ' R$' +
        num
            .toFixed(2) // always two decimal digits
            .replace('.', ',') // replace decimal point character with ,
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
};

export const percentageFormat = (num, total) => {
    if (!num || !total) {
        return '0.00 %';
    }
    return (num / total * 100).toFixed(2) + ' %';
};