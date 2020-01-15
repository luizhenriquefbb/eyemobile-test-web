import json_desafio from '../../misc/json_desafio.json';
import { filterByPeriod, } from '../actions/models/transactionModel';

const defaultState = json_desafio.transactions;

export default (state = defaultState, action) => {
    state = [...state,];
    switch (action.type) {
        case 'GET_TRANSACTION_BY_PERIOD':
            return filterByPeriod(defaultState, action.period, action.range);
        default:
            return state;
    }
};

