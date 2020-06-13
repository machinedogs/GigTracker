import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT, UPDATE_PROFILE, UPDATE_WALLPAPER } from "../actions/user";

const initialState = {
    //userId: null,
    userName: null,
    userEmail: null,
    createdEvents: [],
    savedEvents: [],
    accessToken: null,
    refreshToken: null,
    profileImage: null,
    wallpaperImage:null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userName: action.userName,
                userEmail: action.userEmail,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case SIGNUP:
            return {
                ...state,
                userName: action.userName,
                userEmail: action.userEmail,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case AUTHENTICATE:
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
        default:
            return state;
    }
};