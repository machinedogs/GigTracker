export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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
        /*
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already';
            }
            throw new Error(message);
        }
        */
       const resData = await response.json();
        console.log(resData);
        
        dispatch({
            type: SIGNUP,
            userName: resData.data.host.name,
            userEmail: resData.data.host.email,
            accessToken: resData.data.authorization.auth_token.token,
            refreshToken: resData.data.authorization.refresh_token.token
        });
        
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

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'INVALID_PASSWORD') {
                message = 'Password is invalid';
            } else if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Email is invalid';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: LOGIN,
            userName: resData.data.host.name,
            userEmail: resData.data.host.email,
            accessToken: resData.data.authorization.auth_token.token,
            refreshToken: resData.data.authorization.refresh_token.token
        });
    };
};