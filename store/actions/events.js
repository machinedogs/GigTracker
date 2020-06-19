export const CREATE_EVENT = "CREATE_EVENT";
export const ADD_TO_MY_EVENTS = "ADD_TO_MY_EVENTS";
export const UPDATE_HOSTED_EVENTS = "UPDATE_HOSTED_EVENTS";
export const UPDATE_SAVED_EVENTS = "UPDATE_SAVED_EVENTS";

export const createEvent = (event) => {
	return { type: CREATE_EVENT, event: event };
};

export const addToMyEvents = (event) => {
	return { type: ADD_TO_MY_EVENTS, event: event };
};

//Get a person's hosted/created events
export const UpdateHostedEvents = (createdEvents) => {
	return {
		type: UPDATE_HOSTED_EVENTS,
		createdEvents: createdEvents,
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
		const resData = await response.json();
		console.log("Got response for getting the host events ");
        console.log(resData);
        //ToDo:Eventually improve this filter event
        var filteredEvents = resData.filter( (event)=>{
            console.log(`event is here ${event.title}`)
            if(event.event!=null && event.title!=null && event.description!=null && event.date!=null && event.category!=null && event.image!=null && event.image.length>8){
                console.log(`returns true for event ${event.event}`);
                return true;
            }
            else{
                return false 
            }
        })
        console.log(`filtered Events ${filteredEvents}`)

        //Filter the data for bad events, meaning any null values or something
		dispatch(UpdateHostedEvents(filteredEvents));
	};
};
