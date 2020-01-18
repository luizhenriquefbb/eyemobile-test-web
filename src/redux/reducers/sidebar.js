const defaultState = {
    showSideBar: false,
};

export default (state = defaultState, action) => {
    state = { ...state, };
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            if (action.to === null) {
                state.showSideBar = !state.showSideBar;
            }
            else {
                state.showSideBar = action.to;
            }
            return state;
        default:
            return state;
    }
};

