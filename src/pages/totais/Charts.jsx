import React, { useMemo, useState, } from 'react';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { pie_options, bar_options, } from './ChartsConfigs';
import ic_circle from '../components/icons/ic_circle';
import { getColours, } from '../../utils/chartUtils';
import { connect, } from 'react-redux';
import { currencyFormat, percentageFormat, } from '../../utils/currencyUtils';
import { getTotalAmount, getTotalAmount_sum, } from '../../redux/actions/models/transactionModel';

function Charts(props) {

    // local state from reducer
    const { transactions, } = props;

    const [total, setTotal,] = useState(0); // holds profit - loss
    const [total_sum, setTotal_sum,] = useState(0); // holds profit + loss

    useMemo(() => {
        setTotal(getTotalAmount(transactions));
        setTotal_sum(getTotalAmount_sum(transactions));
    }, [transactions,]);

    // holds a custom data to be used in chart lib (must be in a specific format,
    // @see [[chartsjs](https://github.com/jerairrest/react-chartjs-2)])
    const [servicesChartData, setServicesChartData,] = useState({});
    const [profitsChartData, setProfitsChartData,] = useState({});

    // converts the transaction state to custom data to be used in chart lib
    const servicesToChartData = (transactions) => {
        // get products names (unique)
        let labels = [...new Set(transactions.map(transactions => transactions.product_name)),];

        // for some reason the mockup ignores "folha de pagamento", so do we:
        labels = labels.filter(label => label !== 'Folha de pagamento');

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
                barPercentage: 0.2,
                borderWidth: 1,
            };

        };

        // get products names (unique)
        const labels = [...new Set(transactions.map(transaction => transaction.type)),];

        // get same number of colors
        const colours = getColours(labels.length, 'bar');

        // data to return
        const datasets = [];

        // for each label, create a new new dataSet
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
    const servicesData = servicesChartData.datasets ? servicesChartData.datasets[0] : null;
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
                        {servicesData && servicesData.data.length > 0 &&
                            <div className="products">
                                {servicesData.backgroundColor.map((color, index) => {
                                    return (
                                        <div
                                            className="legend-product-element"
                                            key={`legend-product-element-${index}`}
                                        >
                                            <>
                                                <span>
                                                    {ic_circle({
                                                        color: color,
                                                        className: 'legend-icon',
                                                    })}
                                                    <span>{servicesChartData.labels[index]}</span>
                                                </span>
                                                <span
                                                    className="total"
                                                >
                                                    {currencyFormat(servicesData.data[index])}
                                                    &nbsp;
                                                    ({percentageFormat(servicesData.data[index],
                                                        total)})
                                                </span>
                                            </>
                                        </div>
                                    );

                                })}

                            </div>
                        }
                        <div className="total">
                            <span>
                                {ic_circle({
                                    color: 'none',
                                    className: 'legend-icon',
                                })}
                                <span>TOTAL: </span>
                            </span>
                            <span className="total">
                                {currencyFormat(total)} &nbsp; (100%)
                            </span>
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
                                            <span>
                                                {ic_circle({
                                                    color: data.backgroundColor,
                                                    className: 'legend-icon',
                                                })}
                                                <span>{data.label[0]}</span>
                                            </span>
                                            <span className="total">
                                                {currencyFormat(data.data[0])} &nbsp;
                                                ({percentageFormat(data.data[0], total_sum)})
                                            </span>
                                        </>
                                    </div>
                                );

                            })}

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