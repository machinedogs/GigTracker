import { CREATE_EVENT } from '../actions/events';

const initialState = {
    events: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EVENT:
            return {
                ...state,
                newEvent: action.event
            };
        default:
            return state;
    }
    // return state;
};