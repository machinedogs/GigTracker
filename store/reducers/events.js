import {
    CREATE_EVENT,
    GET_EVENTS,
    UPDATE_SAVED_EVENTS,
    UPDATE_HOSTED_EVENTS,
    SAVE_EVENT,
    UNSAVE_EVENT,
    EDIT_EVENT
} from '../actions/events';

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
        case EDIT_EVENT:
            return {
                ...state,
                events: action.events
            };
        case SAVE_EVENT:
            return {
                ...state,
                savedEvents: state.savedEvents.concat(action.event)
            };
        case UNSAVE_EVENT:
            const existingIndex = state.savedEvents.findIndex(event => event.event === action.eventId)
            if (existingIndex >= 0) { // splice out event to unsave
                const updatedSavedEvents = [...state.savedEvents];
                updatedSavedEvents.splice(existingIndex, 1); 
                return { ...state, savedEvents: updatedSavedEvents };
            }
        default:
            return state;
    }
};
