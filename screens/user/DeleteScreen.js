import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import Card from '../../components/Card';
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
            <Card style={styles.container}>
                <Text>
                    This is the Delete Account Screen.
            </Text>
                <Text>
                    We will delete your user data from our servers.
            </Text>
                <Text>
                    Please confirm below:
            </Text>
                <Button
                    title='Adios!'
                    onPress={deleteAccountHandler}
                />
            </Card>
        </View>
    );
}

DeleteScreen.navigationOptions = {
    headerTitle: 'Delete Account',
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.lightText,
    headerBackTitle: 'Profile'

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightBackground,
        paddingHorizontal: 50,
    },
    container: {
        width: '80%',
        maxWidth: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 300,
        maxHeight: 450,
        padding: 20
    }
});

export default DeleteScreen;