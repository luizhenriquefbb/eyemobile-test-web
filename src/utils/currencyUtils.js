export const currencyFormat = (num) => {
    return (
        ' R$' +
        num
            .toFixed(2) // always two decimal digits
            .replace('.', ',') // replace decimal point character with ,
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
};

export const percentageFormat = (num, total) => {
    return (num / total * 100).toFixed(2) + ' %';
};