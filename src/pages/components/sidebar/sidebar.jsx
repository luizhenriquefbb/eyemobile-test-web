import React, { useState, } from 'react';
import { useHistory, useLocation, } from 'react-router-dom';
import './sidebar.css';
import logo from '../../../assets/Ico/ic_logo.svg';
import ic_cadastro from '../icons/ic_cadastro';
import ic_dashboard from '../icons/ic_dasboard';
import { connect, } from 'react-redux';
import * as sidebarActions from '../../../redux/actions/sidebarActions';
import ic_menu from '../icons/ic_menu';

function SideBar(props) {
    const location = useLocation();
    const history = useHistory();

    // props from reducer
    const { showSideBar, } = props;

    // actions from reducer
    const { toggleSidebar, } = props;

    // get screen size
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    // in order to use navigation
    const [currentLocation, setCurrentLocation,] = useState(location.pathname);

    const changePage = (page) => {
        const to = '/' + page;
        if (location.pathname !== to) {
            history.push(to);
            setCurrentLocation(to);
        }
        toggleSidebar(false);
    };

    return (
        <aside
            className="sidebar"
            style={{
                height: screenHeight + 'px',
                display: screenWidth < 768 && !showSideBar ? 'none' : 'block',
            }}
        >
            <span className='toggle-sidebar' onClick={() => (toggleSidebar())}>
                {ic_menu({ fill1: '#FFF', fill2: '#000', })}
            </span>

            <div className="side-item-logo" onClick={() => changePage('faturamento')}>
                <img src={logo} alt="" className="logo" />
            </div>

            <div
                className={`side-item ${currentLocation === '/faturamento' ? 'on' : ''}`}
                onClick={() => changePage('faturamento')}>
                {ic_dashboard({
                    className: 'side-bar-icon',
                    fill: `${currentLocation === '/faturamento' ? '#FFF' : '#049C7A'}`,
                })}
                <span> Meu Faturamento </span>
            </div>
            <div
                className={`side-item ${currentLocation !== '/faturamento' ? 'on' : ''}`}
                onClick={() => changePage('cadastro')}>
                {ic_cadastro({
                    className: 'side-bar-icon',
                    fill: `${currentLocation !== '/faturamento' ? '#FFF' : '#049C7A'}`,
                })}
                <span> Cadastro </span>
            </div>
        </aside>
    );
}






const mapStateToProps = ({ sidebar_reducer, }) => {
    return {
        showSideBar: sidebar_reducer.showSideBar,
    };
};

export default connect(mapStateToProps, sidebarActions)(SideBar);