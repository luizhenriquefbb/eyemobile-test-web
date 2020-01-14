import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from 'react';
import { useHistory, useLocation, } from 'react-router-dom';
import './sidebar.css';
import logo from '../../../assets/Ico/ic_logo.svg';

export default function SideBar() {
    const location = useLocation();
    const history = useHistory();

    const changePage = (page) => {
        console.log('selected', page);
        const to = '/' + page;
        if (location.pathname !== to) {
            history.push(to);
        }
    };

    return (
        <aside className="sidebar">
            <div className="side-item-logo" onClick={() => changePage('faturamento')}>
                <img src={logo} alt="" className="logo" />
            </div>
            <div className="side-item" onClick={() => changePage('faturamento')}>
                <div>
                    <i className="fa fa-fw fa-total" style={{ fontSize: '1.75em', }} />
                </div>
                <span> Meu Faturamento </span>
            </div>
            <div className="side-item" onClick={() => changePage('cadastro')}>
                <div>
                    <i className="fa fa-fw fa-total" style={{ fontSize: '1.75em', }} />
                </div>
                <span> Cadastro </span>
            </div>
        </aside>
    );
}