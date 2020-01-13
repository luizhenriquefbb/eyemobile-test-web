import React from 'react';
import './App.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

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
