import { combineReducers, } from 'redux';
import transactions_reducer from './transactions';
import clients_reducer from './clients';
export default combineReducers({
    transactions_reducer,
    clients_reducer,
});
