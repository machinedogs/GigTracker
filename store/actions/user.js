export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password, username, passwordConfirmation) => {
    console.log(username, passwordConfirmation);
    return async dispatch => {
        const response = await fetch(
            'https://gigservice.herokuapp.com/hosts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": username,
                    "email": email,
                    "password": password,
                    "password_confirmation": passwordConfirmation
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ 
            type: SIGNUP, 
            token: resData.data.auth_token, 
            userId: resData.data.host.name 
        });
    };
};

// (TODO): Sign in by username or password
export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://gigservice.herokuapp.com/hosts/sign_in',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }
        );

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
            token: resData.data.auth_token, 
            userId: resData.data.host.name 
        });
    };
};