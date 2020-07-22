import * as SecureStore from 'expo-secure-store';
import { saveProfileDataToStorage } from '../../helper/secureStorageHelpers';
//TODO: Move to a constant file 
export const AUTHENTICATE = 'AUTHENTICATE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_WALLPAPER = 'UPDATE_WALLPAPER';
export const LOGOUT = 'LOGOUT';
export const SET_GOING_EVENTS = 'SET_GOING_EVENTS';
export const GOING_TO_EVENT = 'GOING_TO_EVENT';
export const NOT_GOING_TO_EVENT = 'NOT_GOING_TO_EVENT';
export const UPDATE_EVENT = "UPDATE_EVENT";

export const addToGoingEvents = (event) => {
    return async (dispatch, getState) => {
        const accessToken = getState().user.accessToken;
        console.log(accessToken)
        var raw = '';
        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        };
        console.log("Going to this event:")
        console.log(event.event)
        const response = await fetch(
            `https://gigservice.herokuapp.com/api/v1/events/${event.event}/attending?auth_token=${accessToken}`,
            requestOptions)
        const resData = await response.json();
        console.log('Updated DB that user is going to an event')
        console.log(resData)

        dispatch({ type: GOING_TO_EVENT, event: resData.event });
        dispatch({ type: UPDATE_EVENT, event: resData.event });
    }
};

export const removeFromGoingEvents = (event) => {
    return async (dispatch, getState) => {
        const accessToken = getState().user.accessToken;
        console.log(accessToken)
        var raw = '';
        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };
        console.log("No longer going to this event:")
        console.log(event.event)
        const response = await fetch(
            `https://gigservice.herokuapp.com/api/v1/events/${event.event}/attending/1?auth_token=${accessToken}`,
            requestOptions)
        const resData = await response.json();
        console.log('Updated DB that user is not going to this event')
        console.log(resData)

        dispatch({ type: UPDATE_EVENT, event: resData.event });
        dispatch({ type: NOT_GOING_TO_EVENT, event: resData.event });
    }
}

export const authenticate = (userName, userEmail, accessToken, refreshToken) => {
    return {
        type: AUTHENTICATE,
        userName: userName,
        userEmail: userEmail,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

//updates service
export const updateDatabaseProfile = (profileImage, user) => {
    return async () => {
        const accessToken = user.accessToken;
        console.log('access token update db got')
        console.log(accessToken)
        var raw = '';

        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        };
        console.log('request options')
        console.log(requestOptions)
        console.log(`https://gigservice.herokuapp.com/api/v1/host/profiles?auth_token=${accessToken}&profileImage=${profileImage}`)
        const response = await fetch(
            `https://gigservice.herokuapp.com/api/v1/host/profiles?auth_token=${accessToken}&profileImage=${profileImage}`,
            requestOptions)
        const resData = await response.json();
        console.log('Updated DB with new profile')
        console.log(resData)
    }
}

export const updateUserProfile = (profileImage, user) => {
    return async (dispatch) => {
        console.log('Dispatching Action-inside, here is the url the dispatcher got')
        console.log(profileImage)
        //updates database 
        dispatch(updateDatabaseProfile(profileImage, user))
        //updates store
        dispatch(UpdateProfile(profileImage))
        //Update device storage
        saveProfileDataToStorage(profileImage)
        console.log('updating profile')
    }
}
export const UpdateProfile = (profileImage) => {
    return {
        type: UPDATE_PROFILE,
        profileImage: profileImage
    };
}
export const logout = () => {
    return async (dispatch) => {
        console.log("Removing user data from storage and memory")
        deleteFromStorage('userData'); // remove the user saved data
        deleteFromStorage('images');
        dispatch({ type: LOGOUT });
    }
}

export const deleteAccount = () => {
    return async (dispatch, getState) => {
        const refreshToken = getState().user.refreshToken;
        const accessToken = getState().user.accessToken;
        const goingEvents = getState().user.goingEvents;

        // Assemble DELETE Payload
        var raw = '';
        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };
        // Un-go from all events in goingEvents state
        goingEvents.map(async event => {
            // in map
            console.log("No longer going to this event:")
            console.log(event.event)
            const response = await fetch(
                `https://gigservice.herokuapp.com/api/v1/events/${event.event}/attending/1?auth_token=${accessToken}`,
                requestOptions)
            const resData = await response.json();
            console.log('Updated DB that user is not going to this event')
            console.log(resData)
            // in map
        })
        console.log("No longer going to any events")

        // Delete Account
        const response = await fetch(
            `https://gig-authentication-service.herokuapp.com/api/v1/hosts?refresh_token=${refreshToken}`,
            requestOptions
        )
        const resData = await response.json();

        if (resData.error) {
            let message = 'Could not delete account';

            throw new Error(message);
        }
        console.log("Deleting User")
        deleteFromStorage('userData'); // remove the user saved data
        deleteFromStorage('images');
        dispatch({ type: LOGOUT });
    }
}

export const refresh = (email, userName, refreshToken) => {
    return async dispatch => {
        console.log('refreshing tokens!!!')
        var raw = "";

        var requestOptions = {
            method: 'GET',
            body: raw,
            redirect: 'follow'
        };
        try {
            const response = await fetch(
                `https://gig-authentication-service.herokuapp.com/api/v1/refresh?refresh_token=${refreshToken}`,
                requestOptions)
            const resData = await response.json();

            console.log('contacted refresh endpoint');
            console.log(resData)
            dispatch(authenticate(
                userName,
                email,
                resData.data.authorization.auth_token.token,
                resData.data.authorization.refresh_token.token
            ))

            let accessExpiration = new Date(resData.data.authorization.auth_token.expires);
            let refreshExpiration = new Date(resData.data.authorization.refresh_token.expires);
            saveDataToStorage(
                userName,
                email,
                resData.data.authorization.auth_token.token,
                resData.data.authorization.refresh_token.token,
                accessExpiration,
                refreshExpiration
            );
        } catch (error) {
            console.log(error)
        }

    };
};

export const signup = (email, password, username, passwordConfirmation) => {
    console.log(email, password, username, passwordConfirmation);
    return async dispatch => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": username,
            "email": email,
            "password": password,
            "password_confirmation": passwordConfirmation
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        const response = await fetch("https://gig-authentication-service.herokuapp.com/api/v1/hosts", requestOptions);
        const resData = await response.json();
        console.log('Here is response from host')
        console.log(resData)
        if (resData.status === 'ERROR') {
            let message;
            let errorArray = [];
            if (resData.data.email) {
                let emailError = '• Email ' + resData.data.email[0];
                errorArray.push(emailError)
            }
            if (resData.data.password) {
                let passwordError = '• Password ' + resData.data.password[0]
                errorArray.push(passwordError)
            }
            if (resData.data.password_confirmation) {
                errorArray.push('• Passwords do not match')
            }
            message = errorArray.join('\n')

            throw new Error(message);
        }

        console.log(resData);
        dispatch(authenticate(resData.data.host.name, resData.data.host.email, resData.data.authorization.auth_token.token, resData.data.authorization.refresh_token.token))
        //Get profile pic from service and save to store 
        dispatch(UpdateProfile(resData.data.host.profile))

        //Update device storage
        saveProfileDataToStorage(resData.data.host.profile)
        let accessExpiration = new Date(resData.data.authorization.auth_token.expires);
        let refreshExpiration = new Date(resData.data.authorization.refresh_token.expires);
        saveDataToStorage(
            resData.data.host.name,
            resData.data.host.email,
            resData.data.authorization.auth_token.token,
            resData.data.authorization.refresh_token.token,
            accessExpiration,
            refreshExpiration
        )
    };
};

// (TODO): Sign in by username or password
export const login = (email, password) => {
    return async dispatch => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log('Logging in......')
        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://gig-authentication-service.herokuapp.com/api/v1/hosts/sign_in", requestOptions);
        const resData = await response.json();

        if (resData.error) {
            //const errorResData = await response.json();
            let message = 'Email or Password is Invalid';

            throw new Error(message);
        }

        //const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.data.host.name, resData.data.host.email, resData.data.authorization.auth_token.token, resData.data.authorization.refresh_token.token))
        //save profile image response from service to screen
        console.log(`Logging in..${resData.data.host.profile}`)
        //Update device storage
        saveProfileDataToStorage(resData.data.host.profile)
        dispatch(UpdateProfile(resData.data.host.profile))
        let accessExpiration = new Date(resData.data.authorization.auth_token.expires);
        let refreshExpiration = new Date(resData.data.authorization.refresh_token.expires);
        saveDataToStorage(
            resData.data.host.name,
            resData.data.host.email,
            resData.data.authorization.auth_token.token,
            resData.data.authorization.refresh_token.token,
            accessExpiration,
            refreshExpiration
        )
    };
};

//Get a person's hosted/created events
export const setGoingEvents = (goingEvents) => {
    return {
        type: SET_GOING_EVENTS,
        goingEvents: goingEvents,
    };
};

export const getGoingEvents = (accessToken) => {
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
            `https://gigservice.herokuapp.com/api/v1/host/attending?auth_token=${accessToken}`
        );
        const response = await fetch(
            `https://gigservice.herokuapp.com/api/v1/host/attending?auth_token=${accessToken}`,
            requestOptions
        );
        if (response.ok) {
            const resData = await response.json();
            console.log("Got response for getting the going events ");
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
            //console.log(`filtered Events ${filteredEvents}`);

            //Filter the data for bad events, meaning any null values or something
            dispatch(setGoingEvents(filteredEvents));
        }
    };
};

const saveDataToStorage = (userName, userEmail, accessToken, refreshToken, accessExpiration, refreshExpiration) => {
    SecureStore.setItemAsync('userData', JSON.stringify({
        userName: userName,
        userEmail: userEmail,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessExpiration: accessExpiration.toISOString(),
        refreshExpiration: refreshExpiration.toISOString()
    })
    );
}

const deleteFromStorage = (itemKey) => {
    SecureStore.deleteItemAsync(itemKey);
}