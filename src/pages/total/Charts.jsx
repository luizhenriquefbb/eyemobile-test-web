import React from 'react';
import { Doughnut, Bar, } from 'react-chartjs-2';
import { pie_options, bar_options, } from './ChartsConfigs';
import ic_circle from '../components/icons/ic_circle';

export default function (props) {

    // local state from props
    const { services_data, profit_data, } = props;

    // get charts colors base on props
    // const [servicesColors, setServicesColors] = useState({});
    // const [profit_data, setProfit_data] = useState({});

    const productsData = services_data.datasets[0];
    const profitData = profit_data.datasets;

    return (
        <div className="charts">
            <div className="services">
                <span className="title">SERVIÇOS</span>
                <div className="services-chart">
                    <Doughnut
                        data={services_data}
                        options={pie_options}
                    />
                    <div className="legend">
                        <div className="products">
                            {productsData.backgroundColor.map((color, index) => {
                                return (
                                    <div
                                        className="legend-product-element"
                                        key={`legend-product-element-${index}`}
                                    >
                                        <>
                                            {ic_circle({ color: color, className: 'legend-icon', })}
                                            <span>{services_data.labels[index]}</span>
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
                        data={profit_data}
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