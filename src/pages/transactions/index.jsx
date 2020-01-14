import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Breadcrumb from '../components/breadcrumb';
import Clients from '../clients';
import './transactions.css';
import PageFilter from './pageFilter';

export default function Transactions() {

    return (
        <>
            <SideBar />
            <Breadcrumb />

            <PageFilter />
            <Clients />
        </>
    );
}