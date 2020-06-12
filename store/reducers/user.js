import { LOGIN, SIGNUP, AUTHENTICATE,UPDATE_PROFILE, UPDATE_WALLPAPER } from "../actions/user";

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
                userName: action.userName,
                userEmail: action.userEmail,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case SIGNUP:
            return {
                userName: action.userName,
                userEmail: action.userEmail,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case AUTHENTICATE:
            return {
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
        default:
            return state;
    }
};