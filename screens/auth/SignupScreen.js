import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Modal, Text, StatusBar, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Button, Icon, Item, Input, } from 'native-base';

import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/user';
import { emailInputValidator, passwordInputValidator, userNameInputValidator } from '../../helper/userInputHelper';

const SignupScreen = props => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUserNameValid, setIsUserNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState({ isValid: false, lengthValid: false, numberValid: false, caseValid: false });
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const signupHandler = async () => {
        if (userName && email && password) {
            if (isUserNameValid && isEmailValid && passwordValid.isValid) {
                setError(null);
                setIsLoading(true);
                try {
                    await dispatch(authActions.signup(email, password, userName));
                    props.navigation.replace('Home');
                } catch (err) {
                    setError(err.message);
                    // set it back to false here because we only need to reload app state if we
                    //  still on the screen.
                    setIsLoading(false);
                }
            } else {
                Alert.alert('Invalid Form', 'Please make sure all fields are valid', [{ text: 'Okay' }]);
            }
        } else {
            Alert.alert('Incomplete Form', 'Please complete the form', [{ text: 'Okay' }]);
        }
        

    }

    const handleUserNameInput = (userNameInput) => {
        setUserName(userNameInput);
        // Pass email to the validator to confirm its an email
        console.log(userNameInput)
        console.log(userNameInputValidator(userNameInput))
        setIsUserNameValid(userNameInputValidator(userNameInput));
    }

    const handleEmailInput = (emailInput) => {
        setEmail(emailInput);
        // Pass email to the validator to confirm its an email
        console.log(emailInput)
        console.log(emailInputValidator(emailInput))
        setIsEmailValid(emailInputValidator(emailInput));
    }

    const handlePasswordInput = (passwordInput) => {
        setPassword(passwordInput);
        // Pass email to the validator to confirm its an email
        console.log(passwordInput)
        console.log(passwordInputValidator(passwordInput))
        setPasswordValid(passwordInputValidator(passwordInput));
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <SafeAreaView>
                    <View style={{ paddingHorizontal: '10%', paddingTop: '5%' }}>
                        <Item >
                            <Input
                                onChangeText={(text) => handleUserNameInput(text)}
                                value={userName}
                                testID="usernameInput"
                                keyboardType='default'
                                placeholder='Username'
                            />
                            {
                                isUserNameValid ?
                                    (
                                        <Icon
                                            name='checkcircle'
                                            type='AntDesign'
                                            style={{ fontSize: 18, color: '#34c759' }}
                                        />
                                    ) : null
                            }
                        </Item>
                        <Item>
                            <Input
                                onChangeText={(text) => handleEmailInput(text)}
                                value={email}
                                testID="emailInput"
                                keyboardType='email-address'
                                placeholder='Email'
                            />
                            {
                                isEmailValid ?
                                    (
                                        <Icon
                                            name='checkcircle'
                                            type='AntDesign'
                                            style={{ fontSize: 18, color: '#34c759' }}
                                        />
                                    ) : null
                            }
                        </Item>

                        <Item>
                            <Input
                                onChangeText={(text) => handlePasswordInput(text)}
                                value={password}
                                testID="emailInput"
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                            />
                            {
                                passwordValid.isValid ?
                                    (
                                        <Icon
                                            name='checkcircle'
                                            type='AntDesign'
                                            style={{ fontSize: 18, color: '#34c759' }}
                                        />
                                    ) : null
                            }
                        </Item>

                        <View style={{ paddingVertical: 20, paddingHorizontal: 2 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: Colors.darkPurple, fontSize: 16 }}>Password Security:</Text>
                                <TouchableOpacity onPress={() => { setHidePassword(!hidePassword) }}>
                                    <Text style={{ textAlign: 'right', color: Colors.purpleButton }}>
                                        {hidePassword ?
                                            'Show Password' : 'Hide Password'
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: passwordValid.lengthValid ? '#34c759' : 'grey', paddingTop: 3 }} >
                                10 to 24 characters long
                            </Text>
                            <Text style={{ color: passwordValid.caseValid ? '#34c759' : 'grey', paddingTop: 3 }} >
                                Mixture of uppercase and lowercase
                            </Text>
                            <Text style={{ color: passwordValid.caseValid ? '#34c759' : 'grey', paddingTop: 3 }} >
                                Mixture of letters and numbers
                            </Text>
                        </View>
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
                                        onPress={signupHandler}
                                    >
                                        <Text style={styles.createAccountButtonText}>
                                            Join
				                    </Text>
                                    </Button>
                                )
                            }
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
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

export default SignupScreen;