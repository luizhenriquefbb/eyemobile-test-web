import React from 'react';
import './breadcrumb.css';
import ic_menu from '../../../assets/Ico/ic_menu.svg';
import { connect, } from 'react-redux';
import * as sidebarActions from '../../../redux/actions/sidebarActions';

function Breadcrumb(props) {

    // actions from reducer
    const { toggleSidebar, } = props;

    return (
        <nav className="breadcrumb-nav">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" onClick={() => {
                    toggleSidebar();
                }}>
                    <img src={ic_menu} alt="menu" className="icon" />
                    PET SHOP
                </li>
                <li className="breadcrumb-item">Meu Faturamento</li>
            </ol>
        </nav>
    );
}

const mapStateToProps = ({ sidebar_reducer, }) => {
    return {
        showSideBar: sidebar_reducer.showSideBar,
    };
};

export default connect(mapStateToProps, sidebarActions)(Breadcrumb);