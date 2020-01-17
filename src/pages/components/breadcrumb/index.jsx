import React from 'react';
import './breadcrumb.css';
import ic_menu from '../../../assets/Ico/ic_menu.svg';

export default function () {

    const toggleSideBar = () => {
        // ??
    };

    return (
        <nav className="breadcrumb-nav">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" onClick={() => {
                    toggleSideBar();
                }}>
                    <img src={ic_menu} alt="menu" className="icon" />
                    PET SHOP
                </li>
                <li className="breadcrumb-item">Meu Faturamento</li>
            </ol>
        </nav>
    );
}