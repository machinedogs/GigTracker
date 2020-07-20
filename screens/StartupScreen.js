import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../store/actions/user';
import * as authActions from '../store/actions/user';
import * as eventActions from '../store/actions/events';
import { getProfileDataStorage } from '../screens/helper/secureStorageHelpers';
import { getGeoInfo } from '../screens/helper/geoHelper';
import Colors from '../constants/Colors';

const startupTextOptions = [
    "Contacting Orbital Satellite   ",
    "Downloading Memes   ",
    "Kicking Neighbors off Wifi   ",
    "Carping the Diem   ",
]

const StartupScreen = props => {
    const dispatch = useDispatch();
    var startupText = startupTextOptions[Math.floor(Math.random() * startupTextOptions.length)]

    useEffect(() => {
        const tryLogin = async () => {
            console.log('dispatching getEvents from startup page')
            let coordinates = '';
            await getGeoInfo().then(coords => coordinates = coords);
            var currentDate = new Date()
            currentDate.setHours(0,0,0,0);
            await dispatch(eventActions.getEvents(currentDate.toISOString(), coordinates.latitude, coordinates.longitude));
            dispatch(eventActions.getEvents(currentDate));

            const userData = await SecureStore.getItemAsync('userData');

            if (!userData) {
                // Go to home screen if no userData saved to storage
                props.navigation.replace('Home');
                return;
            }

            const transformedData = JSON.parse(userData);
            console.log(userData)
            // pull out the access and refresh token as well as email
            const { userName, userEmail, accessToken, refreshToken, accessExpiration, refreshExpiration } = transformedData;
            const refreshTokenExpiryDate = new Date(refreshExpiration)
            const accessTokenExpiryDate = new Date(accessExpiration)

            //get profile data from storage
            var profileImage = await getProfileDataStorage();

            // check if refresh token expired, then user must manually log in again in home screen
            if (refreshTokenExpiryDate <= new Date() || !refreshToken || !userName || !userEmail || !accessToken) {
                props.navigation.replace('Home');
                return;
            }

            // check if access token expired, then make refresh endpoint call
            if (accessTokenExpiryDate <= new Date()) {
                console.log('refreshing tokens')
                try {
                    await dispatch(authActions.refresh(userEmail, userName, refreshToken));
                } catch (error) {
                    // Delete the invalid user data
                    SecureStore.deleteItemAsync('userData'); // user will have to login again
                    SecureStore.deleteItemAsync('images');
                    props.navigation.replace('Home');
                    return;
                }

                await dispatch(eventActions.GetSavedEvents(accessToken));
                await dispatch(eventActions.GetHostedEvents(accessToken));
                await dispatch(authActions.getGoingEvents(accessToken));
                //Dispatch action to update profile image state in store 
                await dispatch(updateUserProfile(profileImage, transformedData))
                props.navigation.replace('Home');
                return;
            }

            // pass user data to state and navigate to home
            await dispatch(authActions.authenticate(userName, userEmail, accessToken, refreshToken));
            await dispatch(eventActions.GetSavedEvents(accessToken));
            await dispatch(eventActions.GetHostedEvents(accessToken));
            await dispatch(authActions.getGoingEvents(accessToken));
            //Dispatch action to update profile image state in store 
            await dispatch(updateUserProfile(profileImage, transformedData));
            props.navigation.replace('Home');
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen} >
            <StatusBar backgroundColor={Colors.darkGrey} barStyle='light-content' />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 17 }}>
                    {startupText}
                </Text>
                <ActivityIndicator size='large' color='white' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkGrey
    }
});

export default StartupScreen;