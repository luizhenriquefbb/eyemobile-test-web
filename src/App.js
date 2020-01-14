import React from 'react';
import './App.css';
import Routes from './routes';
import { Provider, } from 'react-redux';

import store from './redux';

function App() {
    return (
        <div className="App">
            <header className="App-header">

                <div className="content">
                    <Provider store={store}>
                        <Routes />
                    </Provider>
                </div>
            </header>
        </div>
    );
}

export default App;
