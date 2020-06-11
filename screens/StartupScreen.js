import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/user';

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            // change this to secure store function
            const userData = await SecureStore.getItemAsync('userData');

            if (!userData) {
                // Go to home screen if no userData saved to storage
                props.navigation.navigate('Home');
                return;
            }

            const transformedData = JSON.parse(userData);
            console.log(userData)
            // pull out the access and refresh token as well as email
            const { userName, userEmail, accessToken, refreshToken, accessExpiration, refreshExpiration } = transformedData;
            const refreshTokenExpiryDate = new Date(refreshExpiration)
            const accessTokenExpiryDate = new Date(accessExpiration)

            // check if refresh token expired, then user must manually log in again in home screen
            if (refreshTokenExpiryDate <= new Date() || !refreshToken || !userName || !userEmail || !accessToken) {
                props.navigation.navigate('Home');
                return;
            }
            // check if access token expired, then make refresh endpoint call
            if (accessTokenExpiryDate <= new Date()) {
                await dispatch(authActions.refresh(userEmail, userName, refreshToken))
                props.navigation.navigate('Home');
                return;
            }

            // pass user data to state and navigate to home
            await dispatch(authActions.authenticate(userName, userEmail, accessToken, refreshToken));
            props.navigation.navigate('Home');
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen} >
            <ActivityIndicator size='large' />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;