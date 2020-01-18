import React, { useState, } from 'react';
import SideBar from '../components/sidebar/sidebar';
import logo from '../../assets/Ico/ic_logo.svg';
import { useLocation, useHistory, } from 'react-router-dom';
import './notFound.css';
import { toggleSidebar, } from '../../redux/actions/sidebarActions';

export default function () {

    const location = useLocation();
    const history = useHistory();

    // in order to use navigation
    const [, setCurrentLocation,] = useState(location.pathname);

    const changePage = (page) => {
        const to = '/' + page;
        if (location.pathname !== to) {
            history.push(to);
            setCurrentLocation(to);
        }

        toggleSidebar(false);
    };
    return (
        <>
            <SideBar />
            <div style={{ 'display': 'flex', 'flexDirection': 'column', }}>
                <h1>Página não encontrada</h1>

                <button className='back-to-main' onClick={() => { changePage(''); }}>
                    <img src={logo} alt="logo" />
                    <span>home</span>
                </button>
            </div>
        </>

    );
}