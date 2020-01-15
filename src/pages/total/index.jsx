import React, { useState, useMemo, useEffect, } from 'react';

import './totals.css';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { bar_example, pie_options, bar_options, } from './DoughnutDataExample';
import { connect, } from 'react-redux';
import * as transactionActions from '../../redux/actions/transactionActions';
import { getColours, } from '../../utils/chartUtils';

function Total(props) {

    // props from reducer
    const { transactions, } = props;

    // actions
    const { filterByPeriod, } = props;

    // holds the filter by period info.
    // it is easier to add or remove it
    const [periods, setPeriods,] = useState([
        { key: 'today', name: 'HOJE', selected: true, },
        { key: 'last_week', name: 'ULTIMA SEMANA', selected: false, },
        { key: 'lest_month', name: 'ULTIMO MES', selected: false, },
        { key: 'other', name: 'OUTRO PERIODO', selected: false, },
        { key: 'all', name: 'TODOS', selected: false, },
    ]);

    // when a filter is clicked, the state will changes, so this will be called
    useEffect(() => {
        filterByPeriod(periods.find(period => period.selected).key);
    }, [periods, filterByPeriod,]);

    // holds a custom data to be use in chart-lib
    const [transactionsChartData, setTransactionsChartData,] = useState({});

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

    useMemo(() => {
        console.log('transactions', transactions);
        transactionsToChartData(transactions);
    }, [transactions,]);

    const selectFilter = (period_key) => {
        const period_copy = [...periods,];
        for (const period of period_copy) {
            period.selected = period.key === period_key;
        }

        setPeriods(period_copy);
    };

    return (
        <div className="totals-wrapper">
            <div className="totals-filter">
                {periods.map((period) => {
                    return (
                        <button
                            className={`filter-button ${period.selected ? 'on' : ''}`}
                            onClick={() => selectFilter(period.key)}
                            key={period.key}
                        >
                            {period.name}
                        </button>
                    );
                })}
            </div>

            <div className="period-container">
                <div className="total-value">
                    <span className="title">VALOR TOTAL</span>
                    <span className="value">XXXX</span>
                </div>
                <div className="charts">
                    <div className="services">
                        <span className="title">SERVIÇOS</span>
                        <div className="services-chart">
                            <Doughnut data={transactionsChartData} options={pie_options} />
                        </div>
                    </div>
                    <div className="profit">
                        <span className="title">DESPESAS X RECEITAS</span>
                        <div className="profit-chart">
                            <Bar
                                data={bar_example}
                                options={bar_options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ transactions_reducer, }) => {
    return {
        transactions: Object.values(transactions_reducer),
    };
};

export default connect(mapStateToProps, transactionActions)(Total);