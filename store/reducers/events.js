import { CREATE_EVENT, GET_EVENTS } from '../actions/events';

const initialState = {
    foo: [],
    events: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EVENT:
            return {
                ...state,
                events: state.events.concat(action.event)
            };
        case GET_EVENTS:
            return {
                ...state,
                events: action.events
            };
        default:
            return state;
    }
};