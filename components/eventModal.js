import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;





// modal to cover part of map screen. 
// contains event data
const EventModal = (props) => {
   

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={props.toggleModal} />

            <Modal
            backgroundColor={'white'} isVisible={props.visable}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                    <Text>Here is the title {props.title}</Text>
                    <Text>Here is the description {props.description}</Text>
                    <Text>Here is the hostname {props.hostName}</Text>

                    <Button title="Hide modal" onPress={props.toggleModal} />
                </View>
            </Modal>
        </View>
    );

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH


    }

});

export default EventModal;