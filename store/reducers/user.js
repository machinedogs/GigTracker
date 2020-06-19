import {
	AUTHENTICATE,
	LOGOUT,
	UPDATE_PROFILE
} from "../actions/user";

const initialState = {
	userName: "",
	userEmail: "",
	accessToken: "",
	refreshToken: "",
	profileImage: ""
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
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
