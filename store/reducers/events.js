import {
    CREATE_EVENT,
    GET_EVENTS,
    UPDATE_SAVED_EVENTS,
    UPDATE_HOSTED_EVENTS,
    SAVE_EVENT,
    UNSAVE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    ADD_FILTER,
    REMOVE_FILTER,
    CLEAR_FILTERS,
    SET_FILTERS
} from '../actions/events';
import { TabRouter } from 'react-navigation';

const initialState = {
    createdEvents: [],
    savedEvents: [],
    events: [],
    filters: [],
    filteredEvents: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTER:
            return {
                ...state,
                filters: state.filters.concat(action.filter)
            };
        case REMOVE_FILTER:
            const filterIndex = state.filters.findIndex(filter => filter === action.filter)
            if (filterIndex >= 0) { // splice out filter to remove
                const updatedFilters = [...state.filters];
                updatedFilters.splice(filterIndex, 1);
                return { ...state, filters: updatedFilters };
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: []
            };
        case SET_FILTERS:
            if (state.filters.length > 0) {
                const updatedFilteredEvents = state.events.filter(event => {
                    if (state.filters.includes(event.category)) {
                        return true;
                    } else {
                        return false;
                    }
                });
                return { ...state, filteredEvents: updatedFilteredEvents };
            } else { // if no filters set return regular events
                return { ...state, filteredEvents: state.events };
            }
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
            const savedIndex = state.savedEvents.findIndex(event => event.event === action.eventId)
            if (savedIndex >= 0) { // splice out event to unsave
                const updatedSavedEvents = [...state.savedEvents];
                updatedSavedEvents.splice(savedIndex, 1);
                return { ...state, savedEvents: updatedSavedEvents };
            }
        case DELETE_EVENT:
            // Delete from created Events
            const hostedIndex = state.createdEvents.findIndex(event => event.event === action.eventId)
            if (hostedIndex >= 0) { // splice out event to unsave
                const updatedCreatedEvents = [...state.createdEvents];
                updatedCreatedEvents.splice(hostedIndex, 1);
                return { ...state, createdEvents: updatedCreatedEvents };
            }
        default:
            return state;
    }
};
