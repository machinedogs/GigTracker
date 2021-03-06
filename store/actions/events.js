//Move to its own file
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_HOSTED_EVENTS = "UPDATE_HOSTED_EVENTS";
export const UPDATE_SAVED_EVENTS = "UPDATE_SAVED_EVENTS";
export const GET_EVENTS = "GET_EVENTS";
export const EDIT_EVENT = "EDIT_EVENT";
export const EDIT_CREATED_EVENT = "EDIT_CREATED_EVENT";
export const SAVE_EVENT = "SAVE_EVENT";
export const UNSAVE_EVENT = "UNSAVE_EVENT";
export const DELETE_CREATED_EVENT = "DELETE_CREATED_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_FILTERS = "SET_FILTERS";
export const PEOPLE_GOING = "PEOPLE_GOING";
export const SET_DATE_FILTER = "SET_DATE_FILTER";

export const setDateFilter = (date) => {
	return { type: SET_DATE_FILTER, date: date }
}

export const addFilter = (filter) => {
	return async (dispatch) => {
		await dispatch({ type: ADD_FILTER, filter: filter });
		dispatch(setFilters())
	}
}

export const removeFilter = (filter) => {
	return async (dispatch) => {
		await dispatch({ type: REMOVE_FILTER, filter: filter });
		dispatch(setFilters())
	}
}

export const clearFilters = () => {
	return async (dispatch) => {
		await dispatch({ type: CLEAR_FILTERS });
		dispatch(setFilters())
	}
}

export const setFilters = () => {
	return { type: SET_FILTERS }
}

export const deleteEvent = (event) => {
	return async (dispatch, getState) => {
		const accessToken = getState().user.accessToken;
		var requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		};

		try {
			const response = await fetch(
				`https://gigservice.herokuapp.com/api/v1/host/events/${event.id}?auth_token=${accessToken}`,
				requestOptions
			)
			const resData = await response.json();
			console.log("Deleted Event from DB");
			console.log(resData);
		} catch (err) {
			alert(err)
		}
		dispatch(removeFromCreatedEvents(event))
		dispatch(removeFromEvents(event))
	}
}

export const removeFromCreatedEvents = (event) => {
	return { type: DELETE_CREATED_EVENT, eventId: event.id };
}

export const removeFromEvents = (event) => {
	return { type: DELETE_EVENT, eventId: event.id };
}

export const unsaveEvent = (event) => {
	return async (dispatch, getState) => {
		// put fetch in here when deployed
		var requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		};
		const accessToken = getState().user.accessToken;

		try {
			const response = await fetch(
				`https://gigservice.herokuapp.com/api/v1/host/save_event?auth_token=${accessToken}&event=${event.id}`,
				requestOptions
			)
			const resData = await response.json();
			console.log("Removed Saved Event for User in DB");
			console.log(resData);
		} catch (err) { // could not save event for user
			alert(err);
		}

		dispatch(removeFromSavedEvents(event))
	}
}

export const removeFromSavedEvents = (event) => {
	return { type: UNSAVE_EVENT, eventId: event.id };
}

export const saveEvent = (event) => {
	return async (dispatch, getState) => {

		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		const accessToken = getState().user.accessToken;

		try {
			const response = await fetch(
				`https://gigservice.herokuapp.com/api/v1/host/save_event?auth_token=${accessToken}&event=${event.id}`,
				requestOptions
			)
			const resData = await response.json();
			console.log("Saved Event in DB");
			console.log(resData);
		} catch (err) { // could not save event for user
			alert(err);
		}

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

export const GetSavedEvents = (accessToken) => {
	return async (dispatch) => {
		console.log("Getting saved events...making api call..");
		console.log("access token....");
		console.log(accessToken);
		var raw = "";

		var requestOptions = {
			method: "GET",
			body: raw,
			redirect: "follow",
		};
		//console.log("request options");
		//console.log(requestOptions);
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
			//console.log(resData);
			//ToDo:Eventually improve this filter event
			var filteredEvents = resData.filter((event) => {
				console.log(`event is here ${event.title}`);
				if (
					event.id != null &&
					event.title != null &&
					event.description != null &&
					event.date != null &&
					event.category != null &&
					event.image != null &&
					event.image.length > 8
				) {
					console.log(`returns true for event ${event.id}`);
					return true;
				} else {
					return false;
				}
			});
			//console.log(`filtered Events ${filteredEvents}`);

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

export const getEvents = (date, latitude, longitude) => {
	console.log("Pulling events from microservice for " + date);
	console.log(latitude + "......" + longitude)
	return async (dispatch) => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		if (latitude && longitude) {
			url = `https://gigservice.herokuapp.com/api/v1/events?date=${date}&latitude=${latitude}&longitude=${longitude}`
		} else {
			url = `https://gigservice.herokuapp.com/api/v1/events?date=${date}`
		}

		const response = await fetch(url, requestOptions);
		const mapEvents = await response.json();
		console.log('Received events json from db');
		dispatch(updateMapEvents(mapEvents));
		dispatch(setFilters());
	};
};

export const updateMapEvents = (mapEvents) => {
	console.log(`dispatching map events with ${mapEvents}`);
	return {
		type: GET_EVENTS,
		events: mapEvents,
	};
};

export const addFakeEvents = () => {
	console.log('Adding Fake events, 10 seconds passed');
	var fakeEvents = []
	for (i = 0; i < 1000; i++) {
		fakeEvents.push(
			{
				"event": i,
				"title": "Beach Bocci Ball Game 🧠",
				"description": "Come to tha beach 🏝 🔥🔥🔥🔥",
				"date": "2020-06-23T23:58:20.715Z",
				"image": "https://firebasestorage.googleapis.com/v0/b/gigg-146b7.appspot.com/o/images%2Fo2enw?alt=media&token=5c05074d-2908-41bd-b6d0-2330c6fcf85b",
				"category": "sports",
				"location": {
					"longitude": `${Math.random() * 70}`,
					"latitude": `${Math.random() * 20}`,
					"address": "Temple University, Fontain Street, Stanton, Philadelphia, Philadelphia County, Pennsylvania, 19121, United States of America"
				},
				"host": {
					"profile": "https://firebasestorage.googleapis.com/v0/b/gigg-146b7.appspot.com/o/images%2Flkko9n?alt=media&token=f44dbf3e-e644-420a-9e23-84a4e307f591",
					"name": "john",
					"email": "john@john.com"
				}
			}
		)
	}
	var timeEventsMade = new Date();
	console.log("Events dispatched to reducer @ " + timeEventsMade.toLocaleTimeString())
	return {
		type: GET_EVENTS,
		events: fakeEvents
	};
}

export const getAllEvents = () => {
	return dispatch => {
		setTimeout(() => { dispatch(addFakeEvents()) }, 10000);
	}
};

export const createEvent = (event) => {
	return async (dispatch, getState) => {
		console.log("In creating event action");
		console.log(event.date);
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
			address: event.address
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
				//alert("Successfully created event.");
			}
			const resData = await response.json();

			if (resData.status === "ERROR") {
				let message = "There was an error posting this event.";
				//alert(message);
				throw new Error(message);
			}
			dispatch(updateEventMaps(resData.event))
			dispatch(setFilters())
		} catch (err) {
			alert(err);
		}
	};
};

export const editEvent = (event, id) => {
	return async (dispatch, getState) => {
		console.log(`In editing event action for event ${id}`);
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			title: event.title,
			description: event.description,
			date: event.date,
			category: event.category,
			image: event.image,
			latitude: event.latitude,
			longitude: event.longitude,
			address: event.address
		});
		console.log("Event: " + raw.toString());

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		try {
			const access_token = getState().user.accessToken;
			const response = await fetch(
				`https://gigservice.herokuapp.com/api/v1/host/events/${id}?auth_token=${access_token}`,
				requestOptions
			);
			console.log(`RESPONSE: ${response.status}`);
			if (response.ok) {
				//alert("Successfully replaced event.");
			}
			const resData = await response.json();

			if (response.status === "ERROR") {
				let message = "There was an error editing this event.";
				alert(message);
				throw new Error(message);
			}
			console.log("Response: " + resData);
			dispatch(replaceEvent(resData.event));
			dispatch(replaceCreatedEvent(resData.event));
			dispatch(setFilters())
		} catch (err) {
			alert(err);
		}
	};
};

export const replaceEvent = (event) => {
	return {
		type: EDIT_EVENT,
		event: event,
	};
}

export const replaceCreatedEvent = (event) => {
	return {
		type: EDIT_CREATED_EVENT,
		event: event,
	};
}

export const updateEventMaps = (event) => {
	return {
		type: CREATE_EVENT,
		event: event,
	};
};

export const GetHostedEvents = (accessToken) => {
	return async (dispatch) => {
		console.log("Getting hosted events...making api call..");
		console.log("access token....");
		console.log(accessToken);
		var raw = "";

		var requestOptions = {
			method: "GET",
			body: raw,
			redirect: "follow",
		};
		//console.log("request options");
		//console.log(requestOptions);
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
			//console.log(resData);
			//ToDo:Eventually improve this filter event
			var filteredEvents = resData.filter((event) => {
				console.log(`event is here ${event.title}`);
				if (
					event.id != null &&
					event.title != null &&
					event.description != null &&
					event.date != null &&
					event.category != null &&
					event.image != null &&
					event.image.length > 8
				) {
					console.log(`returns true for event ${event.id}`);
					return true;
				} else {
					return false;
				}
			});
			//console.log(`filtered Events ${filteredEvents}`);

			//Filter the data for bad events, meaning any null values or something
			dispatch(UpdateHostedEvents(filteredEvents));
		}
	};
};

export const getPeopleGoing = (event, accessToken) => {
	return async (dispatch) => {
		console.log("Getting people going to a specific event");
		console.log(accessToken);
		var raw = "";

		var requestOptions = {
			method: "GET",
			body: raw,
			redirect: "follow",
		};
		console.log(
			`https://gigservice.herokuapp.com/api/v1/events/${event}/attending?auth_token=${accessToken}`
		);
		const response = await fetch(
			`https://gigservice.herokuapp.com/api/v1/events/${event}/attending?auth_token=${accessToken}`,
			requestOptions
		);
		if (response.ok) {
			const resData = await response.json();
			console.log("Got response for getting people going to a event ");
			console.log(resData);
			dispatch(updatePeopleAttending(resData));
		}
	};
};
export const updatePeopleAttending = (eventGoing) => {
	return {
		type: PEOPLE_GOING,
		eventGoing: eventGoing,
	};
};