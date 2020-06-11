import * as SecureStore from 'expo-secure-store';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userName, userEmail, accessToken, refreshToken) => {
    return {
        type: AUTHENTICATE,
        userName: userName,
        userEmail: userEmail,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

export const logout = () => {
    console.log("Removing user data from storage and memory")
    deleteFromStorage('userDate'); // remove the user saved data
    return { type: LOGOUT };
}

export const deleteAccount = () => {
    return async (dispatch, getState) => {
        const refreshToken = getState().user.refreshToken;

        // Assemble Delete Request
        var raw = "";
        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };
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
        dispatch({ type: LOGOUT });
    }
}

export const refresh = (email, userName, refreshToken) => {
    return async dispatch => {
        var raw = "";

        var requestOptions = {
            method: 'GET',
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(
            `https://gig-authentication-service.herokuapp.com/api/v1/refresh?refresh_token=${refreshToken}`,
            requestOptions)
        const resData = await response.json();

        console.log('contacted refresh endpoint');
        dispatch({
            type: AUTHENTICATE,
            userName: userName,
            userEmail: email,
            accessToken: resData.data.authorization.auth_token.token,
            refreshToken: resData.data.authorization.refresh_token.token
        });
        let accessExpiration = new Date(resData.data.authorization.auth_token.expires);
        let refreshExpiration = new Date(resData.data.authorization.refresh_token.expires);
        saveDataToStorage(
            userName,
            email,
            resData.data.authorization.auth_token.token,
            resData.data.authorization.refresh_token.token,
            accessExpiration,
            refreshExpiration
        )
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
        dispatch({
            type: AUTHENTICATE,
            userName: resData.data.host.name,
            userEmail: resData.data.host.email,
            accessToken: resData.data.authorization.auth_token.token,
            refreshToken: resData.data.authorization.refresh_token.token
        });
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
            let message = "Email or Password is Invalid";

            throw new Error(message);
        }

        //const resData = await response.json();
        console.log(resData);
        dispatch({
            type: AUTHENTICATE,
            userName: resData.data.host.name,
            userEmail: resData.data.host.email,
            accessToken: resData.data.authorization.auth_token.token,
            refreshToken: resData.data.authorization.refresh_token.token
        });
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