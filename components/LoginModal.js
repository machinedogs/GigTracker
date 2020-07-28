import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text } from 'react-native';
import { Header, Left, Right } from 'native-base';

import Colors from '../constants/Colors';

const LoginModal = props => {

    const onCancelHandler = () => {
        props.onCancel();
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <Header style={{backgroundColor: Colors.darkGrey}}>
                <Right style={{ paddingLeft: 1, position: 'absolute', left: 10}}>
                    <Button title='Cancel' color='white' onPress={onCancelHandler} />
                </Right>
            </Header>
            <View style={styles.inputContainer}>
                <Text style={styles.loginText}>Log in to Current</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        paddingTop: '10%',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 28
    }
});

export default LoginModal;
