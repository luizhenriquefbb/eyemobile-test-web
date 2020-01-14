import React, { useState, } from 'react';
import SideBar from '../components/sidebar/sidebar';
import Breadcrumb from '../components/breadcrumb';
import Clients from '../clients';
import Total from '../total';
import './transactions.css';
import PageFilter from './pageFilter';

import ic_totais from '../../assets/Ico/ic_totais.svg';
import ic_clientes from '../../assets/Ico/ic_clientes.svg';

export default function Transactions() {

    const [selectedFilter, setSelectedFilter,] = useState(<Clients />);

    const [options, setOptions,] = useState([
        {
            name: 'Total',
            component: <Total />,
            icon: ic_totais,
            selected: false,
        },
        {
            name: 'Clients',
            component: <Clients />,
            icon: ic_clientes,
            selected: true,
        },
    ]);

    const selectFilter = (name) => {
        options.forEach(option => {
            // set al to false
            if (option.name !== name) {
                option.selected = false;
            }
            // except one
            else {
                option.selected = true;
                setSelectedFilter(option.component);
            }
        });

        setOptions(options);
    };

    return (
        <>
            <SideBar />
            <Breadcrumb />

            <PageFilter setSelectedFilter={selectFilter} options={options} />
            {selectedFilter}
        </>
    );
}