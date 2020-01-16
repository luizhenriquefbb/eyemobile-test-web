import React, { Component, } from 'react';
import SideBar from '../components/sidebar/sidebar';
export default class NotFound extends Component {

    render() {
        return (
            <>
                <SideBar />
                <div style={{'display': 'flex','flex-direction': 'column',}}>
                    <h1>Página não encontrada</h1>
                </div>
            </>
        );
    }
}