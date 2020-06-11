export const CREATE_EVENT = 'CREATE_EVENT';
export const ADD_TO_MY_EVENTS = 'ADD_TO_MY_EVENTS';

import Host from '../../models/host';
import Location from '../../models/location';


export const createEvent = (event) => {
    console.log('Event to be created: ' + event);
    return async (dispatch, getState) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const newLocation = new Location(event.location.latitude, event.location.longitude);
        const newHost = new Host(getState().user.userName, getState().user.userEmail);

        var raw = JSON.stringify({
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "category": event.category, //e.g. "music", "sports"
            "location": newLocation,
            "host": newHost
        });
        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try{
            const response = await fetch("/https://gigservice.herokuapp.com/api/v1/events", requestOptions);
        const resData = await response.json();

        if (resData.status === 'ERROR') {
            let message = "There was an error posting this event.";
            throw new Error(message);
        }

        console.log("Response: " + resData);

        dispatch({
            type: CREATE_EVENT,
            event: event,
        });
        } catch(err) {
            alert(err)
        }
    }
};

export const addToMyEvents = event => {
    return { type: ADD_TO_MY_EVENTS, event: event }
};