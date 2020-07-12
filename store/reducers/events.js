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
    SET_FILTERS,
    DELETE_CREATED_EVENT,
    EDIT_CREATED_EVENT
} from '../actions/events';
import { UPDATE_EVENT } from '../actions/user'

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
        case UPDATE_EVENT:
            const savedGoingIndex = state.savedEvents.findIndex(event => event.event === action.eventId)
            const updatedSavedGoingEvents = [...state.savedEvents];
            if (savedGoingIndex >= 0) { // splice out event to unsave
                updatedSavedGoingEvents.splice(savedGoingIndex, 1);
                updatedSavedGoingEvents.splice(savedGoingIndex, 0, action.event);
            }
            const regularGoingIndex = state.events.findIndex(event => event.event === action.event.event)
            const updatedGoingEvents = [...state.events];
            if (regularGoingIndex >= 0) { // splice out event to unsave
                updatedGoingEvents.splice(regularGoingIndex, 1);
                updatedGoingEvents.splice(regularGoingIndex, 0, action.event);
            }
            const filteredGoingIndex = state.events.findIndex(event => event.event === action.event.event)
            const updatedFilteredGoingEvents = [...state.events];
            if (filteredGoingIndex >= 0) { // splice out event to unsave
                updatedFilteredGoingEvents.splice(filteredGoingIndex, 1);
                updatedFilteredGoingEvents.splice(filteredGoingIndex, 0, action.event);
            }
            return {
                ...state,
                events: updatedGoingEvents,
                savedEvents: updatedSavedGoingEvents,
                filteredEvents: updatedFilteredGoingEvents
            };
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
            // Check if new event should appear on map if they have its category filtered out
            if (state.filters.includes(action.event.category)) {
                return {
                    ...state,
                    events: state.events.concat(action.event),
                    createdEvents: state.createdEvents.concat(action.event),
                    filteredEvents: state.filteredEvents.concat(action.event),
                };
            } else {
                return {
                    ...state,
                    events: state.events.concat(action.event),
                    createdEvents: state.createdEvents.concat(action.event),
                };
            }

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
            const updatedEvents = [...state.events];
            if (index >= 0) { // splice out event to unsave
                updatedEvents.splice(index, 1);
            }
            const deleteFilterdIndex = state.filteredEvents.findIndex(event => event.event === action.eventId)
            const updatedFilteredEvents = [...state.filteredEvents];
            if (deleteFilterdIndex >= 0) { // splice out event to unsave
                updatedFilteredEvents.splice(deleteFilterdIndex, 1);
            }
            return {
                ...state,
                events: updatedEvents,
                filteredEvents: updatedFilteredEvents
            };

        default:
            return state;
    }
};
