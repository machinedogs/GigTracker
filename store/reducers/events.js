import { CREATE_EVENT, GET_EVENTS, UPDATE_SAVED_EVENTS,
	UPDATE_HOSTED_EVENTS } from '../actions/events';

const initialState = {
	createdEvents: [],
    savedEvents: [],
    events: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_HOSTED_EVENTS:
			return {
				...state,
				createdEvents: action.createdEvents,
			};
		case UPDATE_SAVED_EVENTS:
			return {
				...state,
				savedEvents: action.savedEvents,
			};
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
