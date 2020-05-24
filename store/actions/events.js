export const CREATE_EVENT = 'CREATE_EVENT';
export const ADD_TO_MY_EVENTS = 'ADD_TO_MY_EVENTS';


export const createEvent = event => {
    return { type: CREATE_EVENT, event: event }
};

export const addToMyEvents = event => {
    return { type: ADD_TO_MY_EVENTS, event: event }
};