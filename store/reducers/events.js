import { CREATE_EVENT } from '../actions/events';

const initialState = {
    events: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EVENT:
            // upload event to database
            return state;
        default:
            return state;
    }
    // return state;
};