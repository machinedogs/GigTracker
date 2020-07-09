import {
    CREATE_EVENT,
    GET_EVENTS,
    UPDATE_SAVED_EVENTS,
    UPDATE_HOSTED_EVENTS,
    SAVE_EVENT,
    UNSAVE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    DELETE_CREATED_EVENT,
    EDIT_CREATED_EVENT
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
                events: state.events.concat(action.event),
                createdEvents: state.createdEvents.concat(action.event)
            };
        case GET_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case EDIT_CREATED_EVENT:
            const createdIndex = state.createdEvents.findIndex(event => event.event === action.event.event)
            if (createdIndex >= 0) { // splice out event to unsave
                const updatedCreatedEvents = [...state.createdEvents];
                updatedCreatedEvents.splice(createdIndex, 1);
                updatedCreatedEvents.splice(createdIndex, 0, action.event);
                return { ...state, createdEvents: updatedCreatedEvents };
            }
        case EDIT_EVENT:
            const regularIndex = state.events.findIndex(event => event.event === action.event.event)
            if (regularIndex >= 0) { // splice out event to unsave
                const updatedEvents = [...state.events];
                updatedEvents.splice(regularIndex, 1);
                updatedEvents.splice(regularIndex, 0, action.event);
                return { ...state, events: updatedEvents };
            }
        case SAVE_EVENT:
            return {
                ...state,
                savedEvents: state.savedEvents.concat(action.event)
            };
        case UNSAVE_EVENT:
            const savedIndex = state.savedEvents.findIndex(event => event.event === action.eventId)
            if (savedIndex >= 0) { // splice out event to unsave
                const updatedSavedEvents = [...state.savedEvents];
                updatedSavedEvents.splice(savedIndex, 1);
                return { ...state, savedEvents: updatedSavedEvents };
            }
        case DELETE_CREATED_EVENT:
            // Delete from created Events
            const hostedIndex = state.createdEvents.findIndex(event => event.event === action.eventId)
            if (hostedIndex >= 0) { // splice out event to unsave
                const updatedCreatedEvents = [...state.createdEvents];
                updatedCreatedEvents.splice(hostedIndex, 1);
                return { ...state, createdEvents: updatedCreatedEvents };
            }
        case DELETE_EVENT:
            // Delete from all events
            const index = state.events.findIndex(event => event.event === action.eventId)
            if (index >= 0) { // splice out event to unsave
                const updatedEvents = [...state.events];
                updatedEvents.splice(index, 1);
                return { ...state, events: updatedEvents };
            }
        default:
            return state;
    }
};
