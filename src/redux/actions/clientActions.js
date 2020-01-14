export const filterByName = (clientName = '') => async (dispatch) => {
    dispatch({
        type: 'FILTER_CLIENT',
        clientName,
    });
};
