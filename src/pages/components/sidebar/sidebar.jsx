import React, { useState, } from 'react';
import { useHistory, useLocation, } from 'react-router-dom';
import './sidebar.css';
import logo from '../../../assets/Ico/ic_logo.svg';
import ic_cadastro from '../icons/ic_cadastro';
import ic_dashboard from '../icons/ic_dasboard';

export default function SideBar() {
    const location = useLocation();
    const history = useHistory();

    const [currentLocation, setCurrentLocation,] = useState(location.pathname);

    const changePage = (page) => {
        const to = '/' + page;
        if (location.pathname !== to) {
            history.push(to);
            setCurrentLocation(to);
        }
    };

    return (
        <aside className="sidebar">
            <div className="side-item-logo" onClick={() => changePage('faturamento')}>
                <img src={logo} alt="" className="logo" />
            </div>
            <div className={`side-item ${currentLocation === '/faturamento' ? 'on' : ''}`} onClick={() => changePage('faturamento')}>
                {ic_dashboard({ className: 'side-bar-icon', fill: `${currentLocation === '/faturamento' ? '#FFF' : '#049C7A'}`, })}
                <span> Meu Faturamento </span>
            </div>
            <div className={`side-item ${currentLocation !== '/faturamento' ? 'on' : ''}`} onClick={() => changePage('cadastro')}>
                {ic_cadastro({ className: 'side-bar-icon', fill: `${currentLocation !== '/faturamento' ? '#FFF' : '#049C7A'}`, })}
                <span> Cadastro </span>
            </div>
        </aside>
    );
}