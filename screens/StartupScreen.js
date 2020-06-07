import React, { useEffect} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            // change this to secure store function
            const userData = await AsyncStorage.getItem('userData');

            if (!userData) {
                // Go to home screen if no userData saved to storage
                props.navigation.navigate('Home');
                return;
            }

            const transformedData = JSON.parse(userData);
            // pull out the access and refresh token as well as email
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Home');
                return;
            }
            props.navigation.navigate('Home');
            // set the redux state to have updated tokens + userId and email
            dispatch(authActions.authenticate(userId, token))
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