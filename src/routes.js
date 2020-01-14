import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
import Transactions from './pages/transactions';
import NotFound from './pages/notFound/NotFound';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} render={() => (<Redirect to={'/faturamento'} />)} />
                <Route path="/faturamento" exact={true} component={Transactions}/>
                <Route path="/cadastro" exact={true} render={() => (<Redirect to={'/not_found'}/>)} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}