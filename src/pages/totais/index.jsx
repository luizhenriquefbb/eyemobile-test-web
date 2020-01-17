import React, { useState, useMemo, } from 'react';
import './totals.css';
import { connect, } from 'react-redux';
import TotalsFilter from './TotalsFilter';
import Charts from './Charts';
import Clear from '../components/clear';
import { currencyFormat, } from '../../utils/currencyUtils';

function Total(props) {

    // props from reducer
    const { transactions, } = props;

    const [total, setTotal,] = useState(0);

    /**
     * @deprecated because I realise transactions of type "Despesas" are positive values.
     * (We need to subtract from total)
     *
     * @param {*} transactions
     */
    // eslint-disable-next-line no-unused-vars
    const getTotalAmount_deprecated = (transactions) => {
        let total;
        total = transactions.reduce((total, current) =>
            total + parseFloat(current.amount || 0), 0);
        return total;
    };

    const getTotalAmount = (transactions) => {
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

    useMemo(() => {
        setTotal(getTotalAmount(transactions));
    }, [transactions,]);

    return (
        <div className="totals-wrapper">

            <TotalsFilter />

            <div className="period-container">
                <div className="total-value">
                    <span className="title">VALOR TOTAL</span>
                    <span className="value">{currencyFormat(total)}</span>
                </div>


                <Clear color="default"/>

                <Charts total={total} />

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