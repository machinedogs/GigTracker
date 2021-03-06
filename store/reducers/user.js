import {
	AUTHENTICATE,
	LOGOUT,
	UPDATE_PROFILE,
	GOING_TO_EVENT,
	NOT_GOING_TO_EVENT,
	SET_GOING_EVENTS,
} from "../actions/user";

const initialState = {
	userName: "",
	userEmail: "",
	accessToken: "",
	refreshToken: "",
	profileImage: "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
	goingEvents: []
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
		case SET_GOING_EVENTS:
			return {
				...state,
				goingEvents: action.goingEvents
			};
		case GOING_TO_EVENT:
			return {
				...state,
				goingEvents: state.goingEvents.concat(action.event)
			};
		case NOT_GOING_TO_EVENT:
			console.log("IN REDUCER")
			console.log("id to remove:" + action.event.id)
			const goingIndex = state.goingEvents.findIndex(event => event.id === action.event.id)
			if (goingIndex >= 0) { // splice out event to unsave
				const updatedGoingEvents = [...state.goingEvents];
				updatedGoingEvents.splice(goingIndex, 1);
				return { ...state, goingEvents: updatedGoingEvents };
			}
		default:
			return state;
	}
};
