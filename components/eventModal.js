import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('screen');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const MODAL_HEIGHT = height / 2;

// modal to cover part of map screen. 
// contains event data
const EventModal = (props) => {


    return (
        <View style={{ flex: 1 }}>


            <Modal
                backgroundColor={'#2d3436'}
                isVisible={props.visable}
                onSwipeComplete={() => props.toggleModal()}
                swipeDirection={"down"}
                backdropOpacity={.3}
                backdropColor={'#2c2c54'}
                onBackdropPress={() => props.toggleModal()}
                swipeThreshold={50}
                propagateSwipe
                style={styles.modal}
            >

                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Title: {props.title}</Text>
                        <Text style={styles.eventData}>Description: {props.description}</Text>
                        <Text style={styles.eventData}>Hostname: {props.hostName}</Text>

                        <Button title="Hide modal" onPress={props.toggleModal} />
                    </View >
                </ScrollView>
            </Modal>

        </View>
    );

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        backgroundColor: '#2c2c54',
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        height: MODAL_HEIGHT,
        padding: 10
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        flex: 1,
        marginTop: 300,
        marginLeft: 0,
        marginRight: 0,


    }
    ,
    eventData: {
        color: 'white',
        fontSize: 20
    }
});

export default EventModal;