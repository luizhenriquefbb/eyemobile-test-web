import React, { useState, } from 'react';
import SideBar from '../components/sidebar/sidebar';
import Breadcrumb from '../components/breadcrumb';
import Clients from '../clients';
import Totais from '../totais';
import './transactions.css';
import PageFilter from './pageFilter';

import ic_totais from '../../assets/Ico/ic_totais.svg';
import ic_clientes from '../../assets/Ico/ic_clientes.svg';

export default function Transactions() {

    const [selectedFilter, setSelectedFilter,] = useState(<Totais />);

    const [options, setOptions,] = useState([
        {
            name: 'TOTAIS',
            component: <Totais />,
            icon: ic_totais,
            selected: true,
        },
        {
            name: 'CLIENTES',
            component: <Clients />,
            icon: ic_clientes,
            selected: false,
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