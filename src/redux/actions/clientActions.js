export const filterByName = (clientName = '') => (dispatch) => {
    dispatch({
        type: 'FILTER_CLIENT',
        clientName,
    });
};
