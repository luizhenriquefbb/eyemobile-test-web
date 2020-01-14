import json_desafio from '../../misc/json_desafio.json';


const defaultState = json_desafio.customers;

export default (state = defaultState, action) => {
    switch (action.type) {

    case 'FILTER_CLIENT':
        if (action.clientName === '') {
            return defaultState;
        } else {
            return defaultState.filter(client => client.name.toLowerCase().includes(action.clientName.toLowerCase()));
        }

    default:
        return state;
    }
};

