import { CREATE_EVENT } from '../actions/events';

const initialState = {
    events: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return state
        case CREATE_EVENT:
            return {
                ...state,
                newEvent: action.event
            };
        case DELETE_EVENT:
            return state;
        case SAVE_EVENT:
            return state;
        default:
            return state;
    }
};