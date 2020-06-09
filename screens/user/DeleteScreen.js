import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import * as authActions from '../../store/actions/user';

const DeleteScreen = props => {
    const dispatch = useDispatch();

    const deleteAccountHandler = () => {
        console.log("user is deleting account");
        dispatch(authActions.deleteAccount());
        props.navigation.navigate('Home');
    }

    return (
        <View style={styles.screen}>
            <Text>
                This is the Delete Account Screen.
            </Text>
            <Text>
                We will delete your user data from our servers. Please confirm below:
            </Text>
            <Button
                title='I am sure. Cya suckers!'
                onPress={deleteAccountHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        paddingHorizontal: 50
    }
});

export default DeleteScreen;