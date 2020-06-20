import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const BottomBar = (props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/2.jpg' }} style={styles.img} />
            <Text style={styles.textStyle}>Hello, you</Text>
            <View style={styles.row}>
                <Button
                    title="User Profile"
                    onPress={() => { props.navigation.navigate('Profile') }}
                />
                <Button
                    title="Create Event"
                    onPress={() => { props.navigation.navigate('CreateEvent', {event: null})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    textStyle: {
        textAlign: 'left',
        color: 'white',
        fontSize: 22
    }, img: {
        width: 60,
        height: 60,
        borderRadius: 100 / 2
    }, row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'flex-start'
    }
});

export default BottomBar;
