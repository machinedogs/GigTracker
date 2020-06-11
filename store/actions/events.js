export const CREATE_EVENT = 'CREATE_EVENT';
export const ADD_TO_MY_EVENTS = 'ADD_TO_MY_EVENTS';


export const createEvent = (event) => {
    console.log('Event to be created: ' + event);
    return async (dispatch) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "category": event.category, //e.g. "music", "sports"
            "latitude": event.latitude,
            "longitude": event.longitude,
            "host": {
                "username": event.host.username,
                "email": event.host.email
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

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
    }
};

export const addToMyEvents = event => {
    return { type: ADD_TO_MY_EVENTS, event: event }
};