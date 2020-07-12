import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    TouchableOpacity,
    Text
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import { Card, CardItem } from 'native-base';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/user';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            username: '',
            password: '',
            passwordConfirmation: ''
        },
        inputValidities: {
            email: false,
            username: false,
            password: false,
            passwordConfirmation: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password,
                formState.inputValues.username,
                formState.inputValues.passwordConfirmation,
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password,
                formState.inputValues.username,
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.replace('Home');
        } catch (err) {
            setError(err.message);
            // set it back to false here because we only need to reload app state if we
            //  still on the screen.
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "height" : "height"}
            style={styles.screen}
        >

            <View style={styles.screen}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => {
                        Keyboard.dismiss();
                    }}>
                        <View style={{ maxWidth: '80%' }}>
                            <Card>
                                { // only display username on sign up screen
                                    isSignup ?
                                        (<CardItem>
                                            <Input
                                                id="username"
                                                label="Username"
                                                keyboardType="default"
                                                required
                                                autoCapitalize="none"
                                                errorText="Please enter a valid username"
                                                onInputChange={inputChangeHandler}
                                                initialValue=""
                                            />
                                        </CardItem>)
                                        :
                                        null
                                }
                                <CardItem>
                                    <Input
                                        id="email"
                                        label="Email"
                                        keyboardType="email-address"
                                        required
                                        email
                                        autoCapitalize="none"
                                        errorText="Please enter a valid email address"
                                        onInputChange={inputChangeHandler}
                                        initialValue=""
                                    />
                                </CardItem>
                                <CardItem>
                                    <Input
                                        id="password"
                                        label="Password"
                                        keyboardType="default"
                                        secureTextEntry
                                        required
                                        minLength={5}
                                        autoCapitalize="none"
                                        errorText="Please enter a valid password"
                                        onInputChange={inputChangeHandler}
                                        initialValue=""
                                    />
                                </CardItem>
                                { // only display password confirmation on sign up screen
                                    isSignup ?
                                        (<CardItem>
                                            <Input
                                                id="passwordConfirmation"
                                                label="Confirm Password"
                                                keyboardType="default"
                                                secureTextEntry
                                                required
                                                minLength={5}
                                                autoCapitalize="none"
                                                errorText="Please enter a valid password"
                                                onInputChange={inputChangeHandler}
                                                initialValue=""
                                            />
                                        </CardItem>)
                                        : null

                                }
                                <View>
                                    {isLoading ?
                                        (
                                            <View style={styles.buttonContainer}>
                                                <ActivityIndicator size='small' color={Colors.primary} />
                                            </View>
                                        ) :
                                        (
                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity onPress={authHandler}>
                                                    <View style={{
                                                        backgroundColor: Colors.purpleButton,
                                                        borderRadius: 5,
                                                        borderColor: Colors.purpleButton,
                                                        borderWidth: 2,
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 10
                                                    }}>
                                                        <Text style={{ color: 'white' }}>{isSignup ? 'Sign Up' : 'Login'}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                </View>
                                <View style={{ paddingBottom: 15 }}>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity onPress={() => {
                                            setIsSignup(prevState => !prevState);
                                        }}>
                                            <View style={{
                                                backgroundColor: Colors.purpleBackground,
                                                borderRadius: 5,
                                                borderColor: Colors.purpleBackground,
                                                borderWidth: 2,
                                                paddingHorizontal: 10,
                                                paddingVertical: 10
                                            }}>
                                                <Text style={{ color: 'white' }}>{`Or ${isSignup ? 'Login' : 'Sign Up'}`}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </Card>

                        </View>
                    </TouchableWithoutFeedback>

                </ScrollView>

            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white"
    },
    authContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        maxHeight: 450,
        padding: 20
    },
    buttonContainer: {
        paddingTop: 15,
        alignSelf: 'center'
    }
});

export default AuthScreen;