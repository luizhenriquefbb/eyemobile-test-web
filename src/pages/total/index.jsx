import React, { useState, useMemo, } from 'react';

import './totals.css';
import { connect, } from 'react-redux';
import { getColours, } from '../../utils/chartUtils';
import TotalsFilter from './TotalsFilter';
import Charts from './Charts';
import { bar_example, } from './ChartsConfigs';

function Total(props) {

    // props from reducer
    const { transactions, } = props;

    // holds a custom data to be use in chart-lib
    const [transactionsChartData, setTransactionsChartData,] = useState({});
    const [total, setTotal,] = useState(0);

    // converts the transaction state to custom data to be used in chart lib
    const transactionsToChartData = (transactions) => {
        // get products names (unique)
        const labels = [...new Set(transactions.map(transactions => transactions.product_name)),];

        // holds the sum of each product name
        const data = [];
        for (const productName of labels) {
            const transactionsPerProduct = transactions.filter(transaction =>
                transaction.product_name === productName);

            const sum = transactionsPerProduct.reduce((sum, current) =>
                sum + parseFloat(current.amount || 0), 0);
            data.push(sum);
        }

        const colours = getColours(labels.length);

        const datasets = [{
            backgroundColor: colours,
            borderWidth: 1,
            data,
        },];

        setTransactionsChartData({ labels, datasets, });
    };

    const getTotalAmount = (transactions) => {
        let total;
        total = transactions.reduce((total, current) =>
            total + parseFloat(current.amount || 0), 0);
        return total;
    };

    useMemo(() => {
        transactionsToChartData(transactions);

        setTotal(getTotalAmount(transactions));

    }, [transactions,]);

    const currencyFormat = (num) => {
        return (
            num
                .toFixed(2) // always two decimal digits
                .replace('.', ',') // replace decimal point character with ,
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' R$'
        );
    };

    return (
        <div className="totals-wrapper">

            <TotalsFilter />

            <div className="period-container">
                <div className="total-value">
                    <span className="title">VALOR TOTAL</span>
                    <span className="value">{currencyFormat(total)}</span>
                </div>

                <Charts
                    services_data={transactionsChartData}
                    profit_data={bar_example}
                />

            </div>
        </div>
    );
}

const mapStateToProps = ({ transactions_reducer, }) => {
    return {
        transactions: Object.values(transactions_reducer),
    };
};

export default connect(mapStateToProps)(Total);