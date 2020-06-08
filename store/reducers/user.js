import { AUTHENTICATE } from "../actions/user";

const initialState = {
    //userId: null,
    userName: null,
    userEmail: null,
    createdEvents: [],
    savedEvents: [],
    accessToken: null,
    refreshToken: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                userName: action.userName,
                userEmail: action.userEmail,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        default:
            return state;
    }
};