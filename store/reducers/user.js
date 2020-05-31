import { LOGIN, SIGNUP } from "../actions/user";

const initialState = {
    userId: null,
    userName: null,
    email: null,
    createdEvents: [],
    savedEvents: [],
    token: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
};