export const filterByPeriod = (period = '', range = 0) => (dispatch) => {
    dispatch({
        type: 'GET_TRANSACTION_BY_PERIOD',
        period,
        range,
    });
};
