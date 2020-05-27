import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const TopBar = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>GIGTRACKER</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d3436'
    },
    textStyle: {
        textAlign: 'left',
        fontSize: 25,
        color: 'white'
    }, img: {
        width: 60,
        height: 60,
        borderRadius: 100 / 2
    }
});

export default TopBar;