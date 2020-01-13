import { combineReducers } from "redux";
import transactions from "./transactions";
import clients from "./clients";
export default combineReducers({
    transactions,
    clients,
});
