import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

import { updateUserProfile } from '../store/actions/user';
import * as authActions from '../store/actions/user';
import * as eventActions from '../store/actions/events';
import { getProfileDataStorage } from '../helper/secureStorageHelpers';
import { getGeoInfo } from '../helper/geoHelper';
import Colors from '../constants/Colors';
import Bolt from '../assets/svg/purple_bolt.svg';


const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            let coordinates = '';
            await getGeoInfo().then(coords => coordinates = coords);
            // Set the initial User Location state
            dispatch(authActions.setInitialLocation(coordinates))
            var currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0);
            dispatch(eventActions.setDateFilter(currentDate))
            await dispatch(eventActions.getEvents(currentDate.toISOString(), coordinates.latitude, coordinates.longitude));
            dispatch(eventActions.getEvents(currentDate));

            const userData = await SecureStore.getItemAsync('userData');

            if (!userData) {
                // Go to home screen if no userData saved to storage
                //props.navigation.replace('Home');
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }

            const transformedData = JSON.parse(userData);
            console.log("StartupScreen.js/tryLogin() - Parsed the userData: " + userData)
            // pull out the access and refresh token as well as email
            const { userName, userEmail, accessToken, refreshToken, accessExpiration, refreshExpiration } = transformedData;
            const refreshTokenExpiryDate = new Date(refreshExpiration)
            const accessTokenExpiryDate = new Date(accessExpiration)

            //get profile data from storage
            var profileImage = await getProfileDataStorage();

            // check if refresh token expired, then user must manually log in again in home screen
            if (refreshTokenExpiryDate <= new Date() || !refreshToken || !userName || !userEmail || !accessToken) {
                // v4: props.navigation.replace('Home');
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }

            // check if access token expired, then make refresh endpoint call
            if (accessTokenExpiryDate <= new Date()) {
                console.log('StartupScreen.js/useEffect()/tryLogin() - refreshing tokens')
                try {
                    await dispatch(authActions.refresh(userEmail, userName, refreshToken));
                } catch (error) {
                    // Delete the invalid user data
                    SecureStore.deleteItemAsync('userData'); // user will have to login again
                    SecureStore.deleteItemAsync('images');
                    // v4: props.navigation.replace('Home');
                    // v5: 
                    //props.navigation.dispatch(
                    //    StackActions.replace('Map')
                    //);
                    // If error then don't log user in and just bring them home to login themselves
                    dispatch(authActions.setDidTryAutoLogin());
                }

                dispatch(eventActions.GetSavedEvents(accessToken));
                dispatch(eventActions.GetHostedEvents(accessToken));
                dispatch(authActions.getGoingEvents(accessToken));
                //Dispatch action to update profile image state in store 
                await dispatch(updateUserProfile(profileImage, transformedData))
                // v4: props.navigation.replace('Home');
                //props.navigation.dispatch(
                //    StackActions.replace('Map')
                //);
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }

            // pass user data to state and navigate to home
            dispatch(eventActions.GetSavedEvents(accessToken));
            dispatch(eventActions.GetHostedEvents(accessToken));
            dispatch(authActions.getGoingEvents(accessToken));
            await dispatch(updateUserProfile(profileImage, transformedData));
            await dispatch(authActions.authenticate(userName, userEmail, accessToken, refreshToken));
            dispatch(authActions.setDidTryAutoLogin());
            return;
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen} >
            <StatusBar backgroundColor={Colors.darkGrey} barStyle='light-content' />
            <View style={{ alignItems: 'center' }}>
                <Bolt width={150} height={200} />
                <Text> </Text>
                <View style={{ flexDirection: 'row' }}>


                    <ActivityIndicator size='large' color='white' />
                </View>

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