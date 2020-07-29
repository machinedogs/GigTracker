import React, { useState } from 'react';
import { View, Keyboard, StyleSheet, Modal, Text, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Header, Left, Right, Button, Icon, Item, Input, } from 'native-base';

import Colors from '../constants/Colors';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const LoginModal = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const onCancelHandler = () => {
        setEmail('');
        setPassword('');
        props.onCancel();
    }

    return (
        <Modal visible={props.visible} animationType='slide' >
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <KeyboardAvoidingView behavior="height" >
                    <TouchableWithoutFeedback onPress={() => {
                        Keyboard.dismiss();
                    }}>
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
                                <Button
                                    round
                                    light
                                    style={styles.createAccountButton}
                                    onPress={props.onLogin}
                                >
                                    <Text style={styles.createAccountButtonText}>
                                        Log in
				                    </Text>
                                </Button>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
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
