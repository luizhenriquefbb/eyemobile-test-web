import React, { useMemo, useState, } from 'react';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { pie_options, bar_options, bar_default, pie_default, } from './ChartsConfigs';
import ic_circle from '../components/icons/ic_circle';
import { getColours, } from '../../utils/chartUtils';
import { connect, } from 'react-redux';

function Charts(props) {

    // local state from reducer
    const { transactions, } = props;

    // holds a custom data to be used in chart lib (must be in a specific format,
    // @see [[chartsjs](https://github.com/jerairrest/react-chartjs-2)])
    const [servicesChartData, setServicesChartData,] = useState(pie_default);
    const [profitsChartData, setProfitsChartData,] = useState(bar_default);

    // converts the transaction state to custom data to be used in chart lib
    const servicesToChartData = (transactions) => {
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

        setServicesChartData({ labels, datasets, });
    };

    // converts the transaction state to custom data to be used in chart lib
    const profitsToChartData = (transactions) => {
        /**
         * Creates a new data set
         * @param {string} label
         * @param {number} data
         * @param {string} color eg: 'rgba(255, 255, 255, 1)'
         */
        const getNewDataSet = (label, data, color) => {

            if (!color) {
                color = getColours(1);
            }

            return {
                label: [label,],
                backgroundColor: [color,],
                borderColor: [color,],
                data: [data,],
                barPercentage: 0.4,
                borderWidth: 1,
            };

        };

        // get products names (unique)
        const labels = [...new Set(transactions.map(transaction => transaction.type)),];
        // get same number of colors
        const colours = getColours(labels.length);

        // data to return
        const datasets = [];

        for (const index in labels) {
            const typeName = labels[index];

            const transactionsPerProduct = transactions.filter(transaction =>
                transaction.type === typeName);

            const sum = transactionsPerProduct.reduce((sum, current) =>
                sum + parseFloat(current.amount || 0), 0);

            datasets.push(getNewDataSet(typeName, sum, colours[index]));
        }


        setProfitsChartData({ datasets, });
    };

    // every time transactions changed on reducer:
    useMemo(() => {
        servicesToChartData(transactions);
        profitsToChartData(transactions);
    }, [transactions,]);


    // just a shortcut to this elements:
    const productsData = servicesChartData.datasets ? servicesChartData.datasets[0] : null;
    const profitData = profitsChartData.datasets ? profitsChartData.datasets : null;

    return (
        <div className="charts">
            <div className="services">
                <span className="title">SERVIÇOS</span>
                <div className="services-chart">
                    <Doughnut
                        data={servicesChartData}
                        options={pie_options}
                    />
                    <div className="legend">
                        <div className="products">
                            {productsData && productsData.backgroundColor.map((color, index) => {
                                return (
                                    <div
                                        className="legend-product-element"
                                        key={`legend-product-element-${index}`}
                                    >
                                        <>
                                            {ic_circle({ color: color, className: 'legend-icon', })}
                                            <span>{servicesChartData.labels[index]}</span>
                                        </>
                                    </div>
                                );

                            })}

                        </div>
                        <div className="total">

                        </div>

                    </div>
                </div>
            </div>

            <div className="profit">
                <span className="title">DESPESAS X RECEITAS</span>
                <div className="profit-chart">
                    <Bar
                        data={profitsChartData}
                        options={bar_options}
                    />
                    <div className="legend">
                        <div className="products">
                            {profitData && profitData.map((data, index) => {
                                return (
                                    <div
                                        className="legend-product-element"
                                        key={`legend-product-element-${index}`}
                                    >
                                        <>
                                            {ic_circle({
                                                color: data.backgroundColor,
                                                className: 'legend-icon',
                                            })}
                                            <span>{data.label[0]}</span>
                                        </>
                                    </div>
                                );

                            })}

                        </div>
                        <div className="total">

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

export default connect(mapStateToProps, null)(Charts);