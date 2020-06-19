import {
	UPDATE_SAVED_EVENTS,
	UPDATE_HOSTED_EVENTS,
	AUTHENTICATE,
	LOGOUT,
	UPDATE_PROFILE,
	UPDATE_WALLPAPER,
} from "../actions/user";

const initialState = {
	//userId: null,
	userName: null,
	userEmail: null,
	createdEvents: [],
	savedEvents: [],
	accessToken: null,
	refreshToken: null,
	profileImage: null,
	wallpaperImage: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			console.log(`Authenticating.....`);
			return {
				...state,
				userName: action.userName,
				userEmail: action.userEmail,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
			};
		case UPDATE_PROFILE:
			return {
				...state,
				profileImage: action.profileImage,
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
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
