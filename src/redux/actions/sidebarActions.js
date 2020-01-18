/**
 * hide / show sidebar
 * @param {[null, true, false]} to
 */
export const toggleSidebar = (to = null) => (dispatch) => {
    dispatch({
        type: 'TOGGLE_SIDEBAR',
        to,
    });
};
