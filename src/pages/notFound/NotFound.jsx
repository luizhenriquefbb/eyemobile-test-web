import React, { Component, } from 'react';
import SideBar from '../components/sidebar/sidebar';
export default class NotFound extends Component {

    render() {
        return (
            <div className="">
                <div className="body">
                    <SideBar />
                    <h1>Página não encontrada</h1>
                </div>
            </div>
        );
    }
}