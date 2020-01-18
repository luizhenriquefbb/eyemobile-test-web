import { combineReducers, } from 'redux';
import transactions_reducer from './transactions';
import clients_reducer from './clients';
import sidebar_reducer from './sidebar';

export default combineReducers({
    transactions_reducer,
    clients_reducer,
    sidebar_reducer,
});
