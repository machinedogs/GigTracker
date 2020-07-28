import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignupLoginScreen = props => {
    return (
        <View>
            <Text>
                This is the signup login screen
            </Text>
            <Button
                title="Create Account"
                onPress={() => {
                    props.navigation.navigate("PrivacyStatement")
                }}
            />
            <Button title="Login" />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SignupLoginScreen;