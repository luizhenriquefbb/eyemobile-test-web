import React, { useState, useMemo, } from 'react';
import './totals.css';
import { connect, } from 'react-redux';
import TotalsFilter from './TotalsFilter';
import Charts from './Charts';

function Total(props) {

    // props from reducer
    const { transactions, } = props;

    const [total, setTotal,] = useState(0);

    const getTotalAmount = (transactions) => {
        let total;
        total = transactions.reduce((total, current) =>
            total + parseFloat(current.amount || 0), 0);
        return total;
    };

    useMemo(() => {
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

                <Charts />

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