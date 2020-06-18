import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

import { updateUserProfile } from '../store/actions/user';
import * as authActions from '../store/actions/user';
import { getProfileDataStorage } from '../screens/helper/secureStorageHelpers';

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            // SecureStore.deleteItemAsync('userData')
            // SecureStore.deleteItemAsync('images')

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

            //get profile data from storage
            var profileImage = await getProfileDataStorage();

            // check if refresh token expired, then user must manually log in again in home screen
            if (refreshTokenExpiryDate <= new Date() || !refreshToken || !userName || !userEmail || !accessToken) {
                props.navigation.navigate('Home');
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
                    props.navigation.navigate('Home');
                    return;
                }

                //Dispatch action to update profile image state in store 
                await dispatch(updateUserProfile(profileImage, transformedData))
                props.navigation.navigate('Home');
                return;
            }

            // pass user data to state and navigate to home
            await dispatch(authActions.authenticate(userName, userEmail, accessToken, refreshToken));
            //Dispatch action to update profile image state in store 
            await dispatch(updateUserProfile(profileImage, transformedData));
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