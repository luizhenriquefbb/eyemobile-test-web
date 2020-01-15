import React, { useState, useMemo, useEffect, } from 'react';

import './totals.css';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { pie_example, bar_example, pie_options, bar_options, } from './DoughnutDataExample';
import { connect, } from 'react-redux';
import * as transactionActions from '../../redux/actions/transactionActions';

function Total(props) {

    const { transactions, filterByPeriod, } = props;

    const [periods, setPeriods,] = useState([
        { key: 'today', name: 'HOJE', selected: true, },
        { key: 'last_week', name: 'ULTIMA SEMANA', selected: false, },
        { key: 'lest_month', name: 'ULTIMO MES', selected: false, },
        { key: 'other', name: 'OUTRO PERIODO', selected: false, },
        { key: 'all', name: 'TODOS', selected: false, },
    ]);

    useEffect(() => {
        filterByPeriod(periods.find(period => period.selected).key);
    }, [periods, filterByPeriod]);

    useMemo(() => {
        console.log('transactions', transactions);
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
                            <Doughnut data={pie_example} options={pie_options} />
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