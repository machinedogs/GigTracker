import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'native-base';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/user';
import { ScrollView } from 'react-native';

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
                    <Text style={{ fontSize: 20, color: Colors.purpleBackground }}>
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
                            <Text style={{ fontSize: 17, color: "white" }}>Delete</Text>
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
    }
});

export default DeleteScreen;