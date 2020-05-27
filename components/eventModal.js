import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

// modal to cover part of map screen. 
// contains event data
const eventModal = (props) => {
    return (
        <SlidingUpPanel style={styles.container} ref={c => this._panel = c}>
            <View style={styles.container}>
                <Text>Here is the content inside panel</Text>
                <Button title='Hide' onPress={() => this._panel.hide()} />
            </View>
        </SlidingUpPanel>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default eventModal;