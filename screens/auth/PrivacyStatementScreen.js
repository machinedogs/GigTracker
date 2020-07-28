import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PrivacyStatementScreen = props => {
    return (
        <View>
            <Text>
                This is the privacy statement screen
            </Text>
            <Button
                title="Agree"
                onPress={() => {
                    props.navigation.navigate('Signup');
                }}
            />
            <Button
                title="Disagree"
                onPress={() => {
                    props.navigation.replace('Home');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default PrivacyStatementScreen;