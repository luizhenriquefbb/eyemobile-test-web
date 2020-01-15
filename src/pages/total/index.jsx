import React, { useState, } from 'react';

import './totals.css';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { pie_example, bar_example, pie_options, bar_options, } from './DoughnutDataExample';

export default function Total() {

    const [periods, setPeriods,] = useState([
        { key: 'today', name: 'HOJE', selected: true, },
        { key: 'last_weak', name: 'ULTIMA SEMANA', selected: false, },
        { key: 'lest_month', name: 'ULTIMO MES', selected: false, },
        { key: 'other', name: 'OUTRO PERIODO', selected: false, },
    ]);

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