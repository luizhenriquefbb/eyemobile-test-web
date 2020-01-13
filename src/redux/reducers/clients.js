import json_desafio from "../../misc/json_desafio.json";
const defaultState = json_desafio.transactions;

export default (state = defaultState, action) => {
    switch (action.type) {
    case 'ACTION':
        return state;
    default:
        return state;
    }
};

