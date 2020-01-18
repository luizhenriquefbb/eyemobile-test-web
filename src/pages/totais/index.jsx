import React, { useState, useMemo, } from 'react';
import './totals.css';
import { connect, } from 'react-redux';
import TotalsFilter from './TotalsFilter';
import Charts from './Charts';
import Clear from '../components/clear';
import { currencyFormat, } from '../../utils/currencyUtils';
import { getTotalAmount } from '../../redux/actions/models/transactionModel';

function Total(props) {

    // props from reducer
    const { transactions, } = props;

    const [total, setTotal,] = useState(0);

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


                <Clear color="default" />

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