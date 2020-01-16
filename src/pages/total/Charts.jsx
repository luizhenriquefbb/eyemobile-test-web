import React, { useMemo, useState, } from 'react';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { pie_options, bar_options, bar_example, pie_default, } from './ChartsConfigs';
import ic_circle from '../components/icons/ic_circle';
import { getColours, } from '../../utils/chartUtils';
import { connect, } from 'react-redux';

function Charts(props) {

    // local state from reducer
    const { transactions, } = props;

    // holds a custom data to be used in chart lib (must be in a specific format,
    // @see [[chartsjs](https://github.com/jerairrest/react-chartjs-2)])
    const [servicesChartData, setServicesChartData,] = useState(pie_default);

    const productsData = servicesChartData.datasets ? servicesChartData.datasets[0] : null;
    const profitData = bar_example.datasets;

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

    useMemo(() => {
        servicesToChartData(transactions);
    }, [transactions,]);


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
                        data={bar_example}
                        options={bar_options}
                    />
                    <div className="legend">
                        <div className="products">
                            {profitData.map((data, index) => {
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