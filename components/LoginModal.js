import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Modal, Text, StatusBar, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Button, Icon, Item, Input, } from 'native-base';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/user';

const LoginModal = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const onCancelHandler = () => {
        setEmail('');
        setPassword('');
        props.onCancel();
    }

    const loginHandler = async () => {
        if (email && password) {
            setIsLoading(true);
            try {
                await dispatch(authActions.login(email, password));
                props.navigateHome();
            } catch (err) {
                // set it back to false here because we only need to reload app state if we
                //  still on the screen.
                setIsLoading(false);
            }
        } else {
            Alert.alert('Incomplete Form')
        }

    }

    return (
        <Modal visible={props.visible} animationType='slide' >
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, height: 130, flexGrow: 2 }}>
                            <Text style={styles.loginText}>Log in{'\n'}to Current</Text>
                        </View>
                        <TouchableOpacity onPress={onCancelHandler}>
                            <Icon name='chevron-down' type='FontAwesome5' style={{ paddingBottom: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingHorizontal: '10%', paddingTop: '5%' }}>
                    <Item style={{ borderColor: Colors.lightGrey, borderRadius: 5 }}>
                        <Input
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            testID="emailInput"
                            keyboardType='email-address'
                            placeholder='Email'
                        />
                    </Item>
                    <Item style={{ borderColor: Colors.lightGrey, borderRadius: 5 }}>
                        <Input
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            testID="emailInput"
                            placeholder='Password'
                            secureTextEntry={hidePassword}
                        />
                    </Item>
                    <TouchableOpacity onPress={() => { setHidePassword(!hidePassword) }}>
                        <Text style={{ textAlign: 'right', paddingTop: 10, color: Colors.purpleButton }}>
                            {hidePassword ?
                                'Show Password' : 'Hide Password'
                            }
                        </Text>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 35 }}>
                        {isLoading ?
                            (
                                <ActivityIndicator size='small' color={Colors.primary} />
                            ) :
                            (
                                <Button
                                    round
                                    light
                                    style={styles.createAccountButton}
                                    onPress={loginHandler}
                                >
                                    <Text style={styles.createAccountButtonText}>
                                        Log in
				                    </Text>
                                </Button>
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>

        </Modal >
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: '10%',
        paddingTop: '10%'
    },
    loginText: {
        fontSize: 48
    },
    inputTitle: {
        color: Colors.purpleBackground,
        fontSize: 28,
    },
    createAccountButtonText: {
        fontSize: 20,
        color: 'white',
    },
    createAccountButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.purpleButton,
        borderRadius: 5,
    },
    buttonContainer: {
        paddingTop: 30
    },
});

export default LoginModal;
