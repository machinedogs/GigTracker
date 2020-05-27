import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
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
                backgroundColor={'white'}
                isVisible={props.visable}
                onSwipeComplete={() => props.toggleModal}
                swipeDirection={"down"}
                backdropOpacity={.2}
                swipeThreshold= {50}
                style ={styles.modal}
            >


                <View style={styles.container}>

                    <Text style={styles.title}>Title: {props.title}</Text>
                    <Text>Description: {props.description}</Text>
                    <Text>Hostname: {props.hostName}</Text>

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
        width: SCREEN_WIDTH,
        height: MODAL_HEIGHT,
        padding: 10
    },
    title: {
        fontSize:30,
        fontWeight: 'bold',
        padding:20,
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        flex:1,
        marginTop: 300,
        marginLeft: 0,
        marginRight: 0 ,
      
    }

});

export default EventModal;