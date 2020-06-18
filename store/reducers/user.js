import { SAVED_EVENTS, UPDATE_HOSTED_EVENTS, AUTHENTICATE, LOGOUT, UPDATE_PROFILE, UPDATE_WALLPAPER } from "../actions/user";

const initialState = {
    //userId: null,
    userName: null,
    userEmail: null,
    createdEvents: [],
    savedEvents: [],
    accessToken: null,
    refreshToken: null,
    profileImage: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    wallpaperImage:null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            console.log(`Authenticating.....`)
            return {
                ...state, 
                userName: action.userName,
                userEmail: action.userEmail,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                profileImage: action.profileImage
            }
        case UPDATE_WALLPAPER:
            return {
                ...state,
                wallpaperImage: action.wallpaperImage
            }
        case LOGOUT:
            return initialState;
        case UPDATE_HOSTED_EVENTS:
            return {
            ...state,
            createdEvents: action.createdEvents
            }
        case SAVED_EVENTS:
            return {
            ...state,
            savedEvents: action.savedEvents
            }
        default:
            return state;
    }
};