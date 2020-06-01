import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import Card from '../../components/Card';
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
            password: '',
            username: ''
        },
        inputValidities: {
            email: false,
            password: false,
            username: false
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
            props.navigation.navigate('Home');
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
            behavior='height'
            keyboardVerticalOffset={3}
            style={styles.screen}
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    {
                        isSignup ?
                            <Input
                                id="username"
                                label="Username"
                                keyboardType="default"
                                required
                                autoCapitalize="none"
                                errorText="Please enter a valid username"
                                onInputChange={inputChangeHandler}
                                initialValue=""
                            /> :
                            null
                    }
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
                    {isLoading ?
                        (
                            <View style={styles.buttonContainer}>
                                <ActivityIndicator size='small' color={Colors.primary} />
                            </View>
                        ) :
                        <View style={styles.buttonContainer}>
                            <Button
                                title={isSignup ? 'Sign Up' : 'Login'}
                                color={Colors.primary}
                                onPress={authHandler}
                            />
                        </View>
                    }
                    <View style={styles.buttonContainer}>
                        <Button
                            title={`Or ${isSignup ? 'Login' : 'Sign Up'}`}
                            color={Colors.accent}
                            onPress={() => {
                                setIsSignup(prevState => !prevState);
                            }}
                        />
                    </View>
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Login or Signup',
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.lightText,
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightBackground
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 450,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;