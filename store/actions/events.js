export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_HOSTED_EVENTS = "UPDATE_HOSTED_EVENTS";
export const UPDATE_SAVED_EVENTS = "UPDATE_SAVED_EVENTS";
export const GET_EVENTS = "GET_EVENTS";
export const SAVE_EVENT = "SAVE_EVENT";
export const UNSAVE_EVENT = "UNSAVE_EVENT";

export const unsaveEvent = (event) => {
	return async (dispatch, getState) => {
		// put fetch in here when deployed
		dispatch(removeFromSavedEvents(event))
	}
}

export const removeFromSavedEvents = (event) => {
	return { type: UNSAVE_EVENT, eventId: event.event };
}

export const saveEvent = (event) => {
	return async (dispatch, getState) => {
		/*
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		const accessToken = getState().user.accessToken;

		try {
			fetch(
				`https://gigservice.herokuapp.com/api/v1/host/save_event?auth_token=${accessToken}&event=${event.id}`,
				requestOptions
			)
		} catch (err) { // could not save event for user
			alert(err);
		}
		console.log("Event saved in DB")
		*/
		// Add saved event to redux store
		dispatch(addToSavedEvents(event));
	}
}

export const addToSavedEvents = (event) => {
	return { type: SAVE_EVENT, event: event };
};

//Get a person's hosted/created events
export const UpdateSavedEvents = (savedEvents) => {
	return {
		type: UPDATE_SAVED_EVENTS,
		savedEvents: savedEvents,
	};
};

export const GetSavedEvents = (user) => {
	return async (dispatch) => {
		console.log("Getting saved events...making api call..");
		const accessToken = user.accessToken;
		console.log("access token....");
		console.log(accessToken);
		var raw = "";

		var requestOptions = {
			method: "GET",
			body: raw,
			redirect: "follow",
		};
		console.log("request options");
		console.log(requestOptions);
		console.log(
			`https://gigservice.herokuapp.com/api/v1/host/saved_events?auth_token=${accessToken}`
		);
		const response = await fetch(
			`https://gigservice.herokuapp.com/api/v1/host/saved_events?auth_token=${accessToken}`,
			requestOptions
		);
		if (response.ok) {
			const resData = await response.json();
			console.log("Got response for getting the saved events ");
			console.log(resData);
			//ToDo:Eventually improve this filter event
			var filteredEvents = resData.filter((event) => {
				console.log(`event is here ${event.title}`);
				if (
					event.event != null &&
					event.title != null &&
					event.description != null &&
					event.date != null &&
					event.category != null &&
					event.image != null &&
					event.image.length > 8
				) {
					console.log(`returns true for event ${event.event}`);
					return true;
				} else {
					return false;
				}
			});
			console.log(`filtered Events ${filteredEvents}`);

			//Filter the data for bad events, meaning any null values or something
			dispatch(UpdateSavedEvents(filteredEvents));
		}
	};
};

//Get a person's hosted/created events
export const UpdateHostedEvents = (createdEvents) => {
	return {
		type: UPDATE_HOSTED_EVENTS,
		createdEvents: createdEvents,
	};
};

export const getEvents = () => {
	console.log("Pulling events from microservice");
	return async (dispatch) => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const response = await fetch(
			"https://gigservice.herokuapp.com/api/v1/events",
			requestOptions
		);
		const mapEvents = await response.json();
		console.log(`Map Events ${mapEvents}`);
		dispatch(updateMapEvents(mapEvents));
	};
};

export const updateMapEvents = (mapEvents) => {
	console.log(`dispatching map events with ${mapEvents}`);
	return {
		type: GET_EVENTS,
		events: mapEvents,
	};
};

export const createEvent = (event) => {
	return async (dispatch, getState) => {
		console.log(event);
		console.log("IN creating event action");
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			title: event.title,
			description: event.description,
			date: event.date,
			category: event.category, //e.g. "music", "sports"
			image: event.image,
			latitude: event.latitude,
			longitude: event.longitude,
		});
		console.log("Event: " + raw.toString);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		try {
			const access_token = getState().user.accessToken;
			const response = await fetch(
				`https://gigservice.herokuapp.com/api/v1/host/events?auth_token=${access_token}`,
				requestOptions
			);
			if (response.ok) {
				alert("Successfully created event.");
			}
			const resData = await response.json();

			if (resData.status === "ERROR") {
				let message = "There was an error posting this event.";
				alert(message);
				throw new Error(message);
			}
			console.log("Response: " + resData);
			dispatch(getEvents);
		} catch (err) {
			alert(err);
		}
	};
};
export const updateEventMaps = () => {
	return {
		type: CREATE_EVENT,
		event: event,
	};
};

export const GetHostedEvents = (user) => {
	return async (dispatch) => {
		console.log("Getting hosted events...making api call..");
		const accessToken = user.accessToken;
		console.log("access token....");
		console.log(accessToken);
		var raw = "";

		var requestOptions = {
			method: "GET",
			body: raw,
			redirect: "follow",
		};
		console.log("request options");
		console.log(requestOptions);
		console.log(
			`https://gigservice.herokuapp.com/api/v1/host/events?auth_token=${accessToken}`
		);
		const response = await fetch(
			`https://gigservice.herokuapp.com/api/v1/host/events?auth_token=${accessToken}`,
			requestOptions
		);
		if (response.ok) {
			const resData = await response.json();
			console.log("Got response for getting the host events ");
			console.log(resData);
			//ToDo:Eventually improve this filter event
			var filteredEvents = resData.filter((event) => {
				console.log(`event is here ${event.title}`);
				if (
					event.event != null &&
					event.title != null &&
					event.description != null &&
					event.date != null &&
					event.category != null &&
					event.image != null &&
					event.image.length > 8
				) {
					console.log(`returns true for event ${event.event}`);
					return true;
				} else {
					return false;
				}
			});
			console.log(`filtered Events ${filteredEvents}`);

			//Filter the data for bad events, meaning any null values or something
			dispatch(UpdateHostedEvents(filteredEvents));
		}
	};
};
