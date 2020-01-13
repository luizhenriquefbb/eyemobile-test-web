import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Clients from './pages/clients'
import Total from './pages/total'

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Total}/>
                <Route path="/clients" component={Clients}/>
            </Switch>
        </BrowserRouter>
    )
}