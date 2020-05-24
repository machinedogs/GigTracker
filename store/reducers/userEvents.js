import { ADD_TO_MY_EVENTS, CREATE_EVENT } from "../actions/events";

const initialState = {
    myEvents: {},
    hostedEvents: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_MY_EVENTS:
            // If you click on an event you want to go to it should be added
            //  to the myEvents object. It's a json that contains event objects
            // save event to local sqlite database
            return state;
        case CREATE_EVENT:
            // If you make an event it should be added to the hosted events object.
            //  Its a json that contains event objects
            // save event to local sqlite database
            return state;

    }
    return state;
};