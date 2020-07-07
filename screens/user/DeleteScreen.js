import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'native-base';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/user';

const DeleteScreen = props => {
    const dispatch = useDispatch();

    const deleteAccountHandler = () => {
        console.log("User triggered deleteAccount action creator");
        dispatch(authActions.deleteAccount());
        props.navigation.navigate('Home');
    }

    return (
        <View style={styles.screen}>
            <Card>
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 20, paddingVertical: 10 }}>
                        We will immediately delete:
                    </Text>
                    <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                        • Username, Email, Password
                    </Text>
                    <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                        • Any events you may have hosted
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15 }}>
                    <Text style={{ fontSize: 20 }}>
                        Please confirm:
                    </Text>
                    <TouchableOpacity onPress={deleteAccountHandler}>
                        <View style={{
                            backgroundColor: '#f5b800',
                            borderRadius: 5,
                            borderColor: '#f5b800',
                            borderWidth: 2,
                            paddingHorizontal: 10,
                            paddingVertical: 5
                        }}>
                            <Text style={{ fontSize: 17 }}>Adios!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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