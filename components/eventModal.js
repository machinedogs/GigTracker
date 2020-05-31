import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, FlatList } from 'react-native';
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
                isVisible={props.visible}
                onSwipeComplete={() => props.toggleModal()}
                swipeDirection={"down"}
                backdropOpacity={.3}
                onBackdropPress={() => props.toggleModal()}
                swipeThreshold={100}
                TransitionOutTiming={0}
                style={styles.modal}
                propagateSwipe
            >

                <ScrollView style={styles.ScrollView}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{props.title}</Text>
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
        color: 'black',
        fontWeight: 'bold',
        padding: 20,
        marginTop: -10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 0,
        textShadowRadius: 10,
        shadowColor: 'blue',
        borderWidth: 0,
        borderColor: '#57a4f2',
        textAlign: 'center',
        width: SCREEN_WIDTH

    },
    modal: {
        flex: 1,
        marginTop: 300,
        marginLeft: 0,
        marginRight: 0,

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
        width: SCREEN_WIDTH,
        paddingTop: 4,
        flex: 1,
    }
    ,
    ScrollView:{
        marginHorizontal:0
    }

});

export default EventModal;