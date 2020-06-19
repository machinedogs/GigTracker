export const CREATE_EVENT = 'CREATE_EVENT';
export const ADD_TO_MY_EVENTS = 'ADD_TO_MY_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';

import Host from '../../models/host';
import Location from '../../models/location';

export const getEvents = () => {
    console.log('Pulling events from microservice');
    return async (dispatch) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("https://gigservice.herokuapp.com/api/v1/events", requestOptions);
        const theEvents = await response.json();
        //const theEvents = await JSON.parse(data);

        if (theEvents) {
            console.log(theEvents)
        }
        //setEvents(theEvents);
        dispatch({
            type: GET_EVENTS,
            events: theEvents
        });
    }
}

export const createEvent = (event) => {
    console.log('Event to be created: ' + event);
    return async (dispatch, getState) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //const newLocation = new Location(event.location.latitude, event.location.longitude);
        //const newHost = new Host(getState().user.userName, getState().user.userEmail);

        //{ "title": "Party 2", "description": "Come party yall", "date": "", "type_id": "1", "latitude": "39.98", "longitude": "-75.16" }
        var raw = JSON.stringify({
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "category": event.category, //e.g. "music", "sports"
            "latitude": event.location.latitude,
            "longitude": event.location.longitude,
            //"image": event.image,
            //"hostName": event.host.hostName,
            //"hostEmail": event.host.hostEmail
        });
        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const access_token = getState().user.accessToken;
            const response = await fetch(`https://gigservice.herokuapp.com/api/v1/events?auth_token=${access_token}`, requestOptions);
            const resData = await response.json();

            if (resData.status === 'ERROR') {
                let message = "There was an error posting this event.";
                alert(message);
                throw new Error(message);
            }

            console.log("Response: " + resData);
            dispatch({
                type: CREATE_EVENT,
                event: event,
            });
            alert("Successfully created event.")
        } catch (err) {
            console.log('Error posting event: ' + err);
            alert(err)
        }
    }
};

export const addToMyEvents = event => {
    return { type: ADD_TO_MY_EVENTS, event: event }
};