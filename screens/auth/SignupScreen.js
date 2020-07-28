import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignupScreen = props => {
    return(
        <View>
            <Text>
                This is the signup screen
            </Text>
            <Button 
            title="Join" 
            onPress={() => {
                props.navigation.navigate('Home')
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SignupScreen;