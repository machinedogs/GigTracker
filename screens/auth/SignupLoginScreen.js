import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { StackActions, CommonActions } from '@react-navigation/native';


import Colors from '../../constants/Colors';
import LoginModal from '../../components/LoginModal';

const SignupLoginScreen = props => {
    const [isLoginMode, setIsLoginMode] = useState(false);

    const cancelLoginHandler = () => {
        setIsLoginMode(false);
    }

    const goHomeHandler = () => {
        // v4: props.navigation.replace('Home');
        //props.navigation.dispatch(
        //    StackActions.replace('Map')
        //);
        props.navigation.dispatch(
            CommonActions.navigate('Home', {
                screen: 'Map',
            })
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <LoginModal visible={isLoginMode} onCancel={cancelLoginHandler} navigateHome={goHomeHandler} />
            <Text style={styles.welcomeText}>
                {'Stay Current\nwith whats\ngoing on'}
            </Text>
            <View style={styles.buttonContainer}>
                <Button
                    round
                    light
                    style={styles.createAccountButton}
                    onPress={() => {
                        // v4: props.navigation.navigate("PrivacyStatement")
                        props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'PrivacyStatement'
                            })
                        );
                    }}
                >
                    <Text style={styles.createAccountButtonText}>
                        Create Account
				    </Text>
                </Button>
            </View>
            <View style={styles.loginTextContainer}>
                <Text>{'Have an account already? '}</Text>
                <TouchableOpacity onPress={() => setIsLoginMode(true)}>
                    <Text style={styles.loginLinkText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        paddingHorizontal: '10%'
    },
    welcomeText: {
        fontSize: 48,
        paddingLeft: '10%',
        paddingTop: '35%',
        paddingBottom: '10%'
    },
    loginTextContainer: {
        flexDirection: 'row',
        paddingLeft: '10%',
        paddingBottom: '20%',
        bottom: 0,
        position: 'absolute'
    },
    loginLinkText: {
        color: '#147EFB',
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
    }
});

export default SignupLoginScreen;