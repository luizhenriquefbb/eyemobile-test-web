import React, { useState, useEffect, } from 'react';
import { connect, } from 'react-redux';
import * as transactionActions from '../../redux/actions/transactionActions';

function TotalsFilter(props) {

    // holds the filter by period info.
    // it is easier to add or remove it
    const [periods, setPeriods,] = useState([
        { key: 'today', name: 'HOJE', selected: false, },
        { key: 'last_week', name: 'ULTIMA SEMANA', selected: false, },
        { key: 'lest_month', name: 'ULTIMO MES', selected: false, },
        { key: 'other', name: 'OUTRO PERIODO', selected: false, },
        { key: 'all', name: 'TODOS', selected: true, },
    ]);

    // actions
    const { filterByPeriod, } = props;

    const selectFilter = (period_key) => {
        const period_copy = [...periods,];
        for (const period of period_copy) {
            period.selected = period.key === period_key;
        }

        setPeriods(period_copy);
    };

    // when a filter is clicked, the state will changes, so this will be called
    useEffect(() => {
        filterByPeriod(periods.find(period => period.selected).key);
    }, [periods, filterByPeriod,]);

    return (
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
    );
}


const mapStateToProps = ({ transactions_reducer, }) => {
    return {
        transactions: Object.values(transactions_reducer),
    };
};

export default connect(mapStateToProps, transactionActions)(TotalsFilter);