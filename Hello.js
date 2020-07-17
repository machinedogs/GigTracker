import React from 'react';
import { Text, View } from 'react-native';

const Hello = ({name}) => {
    return (
        <View>
            <Text>Hello, world!</Text>
            <Text>Hello, {name}!</Text>
        </View>
    );
}


export default Hello;