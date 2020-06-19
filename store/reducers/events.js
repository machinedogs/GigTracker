import { UPDATE_SAVED_EVENTS,
	UPDATE_HOSTED_EVENTS,CREATE_EVENT } from '../actions/events';

const initialState = {
	createdEvents: [],
	savedEvents: []
};

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
        default:
            return state;
    }
    // return state;
};