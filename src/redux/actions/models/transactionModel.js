export const filterByPeriod = (transactions, period, otherRange = 0) => {
    switch (period) {
        case 'today':
            return transactions.filter(transaction => {
                const transaction_date = new Date(transaction.time);
                const today = new Date();
                return (transaction_date.toDateString() === today.toDateString());
            });

        case 'last_week':
            return transactions.filter(transaction => {
                const transaction_date = new Date(transaction.time);
                const today = new Date();
                var aWeekAgo = new Date().setDate(today.getDate() - 7);
                return (transaction_date > aWeekAgo && transaction_date < today);
            });
        case 'lest_month':
            return transactions.filter(transaction => {
                const transaction_date = new Date(transaction.time);
                const today = new Date();
                var aMonthAgo = new Date().setDate(today.getDate() - 30);
                return (transaction_date > aMonthAgo && transaction_date < today);
            });
        case 'other':
            return transactions.filter(transaction => {
                const transaction_date = new Date(transaction.time);
                const today = new Date();
                var other = new Date().setDate(today.getDate() - otherRange);
                return (transaction_date > other && transaction_date < today);
            });
        case 'all':
            return transactions;

        default:
            return transactions;
    }
};

/**
 * @return "Lucros + Despesas"
 * @param {*} transactions
 */
export const getTotalAmount_sum = (transactions) => {
    let total;
    total = transactions.reduce((total, current) =>
        total + parseFloat(current.amount || 0), 0);
    return total;
};

/**
 * @return "Lucros - Despesas"
 * @param {*} transactions
 */
export const getTotalAmount = (transactions) => {
    let total;
    total = transactions.reduce((total, current) => {
        if (current.type === 'Receitas') {
            return total + parseFloat(current.amount || 0);
        }
        else {
            return total - parseFloat(current.amount || 0);

        }
    }, 0);
    return total;
};