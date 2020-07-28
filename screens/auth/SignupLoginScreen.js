import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'native-base';

import Colors from '../../constants/Colors';

const SignupLoginScreen = props => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>
                {'Stay Current\nwith whats\ngoing on'}
            </Text>
            <View style={styles.buttonContainer}>
                <Button
                    round
                    light
                    onPress={() => {
                        props.navigation.navigate("PrivacyStatement")
                    }}
                    style={styles.createAccountButton}
                >
                    <Text style={styles.createAccountButtonText}>
                        Create Account
				    </Text>
                </Button>
            </View>
            <Text style={styles.loginText}>
                {'Have an account already? '}
                <Text
                    style={styles.loginLinkText}
                    onPress={() => {
                        props.navigation.navigate('Home')
                    }}
                >
                    Log in
                </Text>
            </Text>
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
    loginText: {
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