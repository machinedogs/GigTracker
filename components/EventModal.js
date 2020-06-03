import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('screen');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const MODAL_HEIGHT = height / 2;

// modal to cover part of map screen. 
// contains event data
const EventModal = (props) => {


    return (

        <Modal
            backgroundColor={'#2d3436'}
            isVisible={props.visible}
            onSwipeComplete={() => props.toggleModal()}
            backdropOpacity={.3}
            swipeDirection={'down'}
            onBackdropPress={() => props.toggleModal()}
            swipeThreshold={100}
            TransitionOutTiming={0}
            style={styles.modal}
            borderRadius={10}
            propagateSwipe
        >
            <View>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={true}
            >
                <TouchableOpacity
                    activeOpacity={1}
                >
                    <View style={styles.container}>

                        <Text style={styles.hostName}>Hostname: {props.hostName}</Text>
                        <Text style={styles.eventData}>{props.description}</Text>
                        <View style={styles.saveButton}>
                            <Button
                                raised={true}
                                title="Save Event"
                                color={'#57a4f2'}
                            />
                        </View>
                    </View >
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        backgroundColor: '#2c2c54',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 0,
        overflow: 'hidden'
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        padding: 20,
        marginTop: -10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        textShadowRadius: 10,
        shadowColor: 'blue',
        textAlign: 'center',
        width: SCREEN_WIDTH

    },
    modal: {
        flex: 1,
        marginTop: 300,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: '#2c2c54',
        maxHeight: SCREEN_HEIGHT
    },
    hostName: {

        fontSize: 25,
        color: 'white',
    }
    ,
    eventData: {
        color: 'white',
        fontSize: 20
    },
    saveButton: {
        margin: 40,
        width: SCREEN_WIDTH / 3,
        paddingTop: 4,
        flex: 1,
        elevation: 10
    }

});




export default EventModal;