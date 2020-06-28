import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react'
import { Thumbnail } from 'native-base';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';

import formatStandardTime from '../helper/TimeFormater'

// this function returns the screen elements for the event screen
// this should take the event or event id as a prop. we should also
// save the isEventSaved in a redux store for persistance.  
const EventScreen = (props) => {

    const [isEventSaved, setEventSaved] = useState(false);

    const event = props.navigation.getParam('event');
    console.log("this is the event " + JSON.stringify(event));


    //  for icon color selection
    const toggleSaveButton = () => {
        setEventSaved(!isEventSaved);
        console.log(isEventSaved);
    };

    return (

        <ScrollView style={{ backgroundColor: 'black' }}>
            <View >

                <Grid>

                    <Col size={1} style={{ backgroundColor: '#609ae0', height: 275 }}>
                        <Image
                            style={{ flex: 1 }}
                            source={{ uri: event.image }}
                        />
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: 'black', height: 'auto' }}>
                        <Thumbnail style={{ marginLeft: 10, marginTop: 10, marginBottom: 5, padding: 0 }} source={{ uri: event.host.profile }} />
                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 10 }}>
                            {event.host.name}
                        </Text>
                    </Col>
                    <Col size={2} style={{ backgroundColor: 'black', height: 'auto' }}>
                        <Text style={{ fontSize: 15, color: 'white', marginTop: 10, margin: 5 }}>{event.location.address.substring(0, 50)}</Text>
                    </Col>
                    <Col size={2} style={{ backgroundColor: 'black', height: 'auto' }}>
                        {Platform.OS === 'ios' ?
                            (
                                <Text style={{ fontSize: 35, color: 'white' }}>
                                    {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </Text>

                            ) :
                            (
                                // format time for android
                                <Text style={{ fontSize: 35, color: 'white' }}>
                                    {formatStandardTime(event.date)}
                                </Text>
                            )}

                        <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10 }}>
                            {new Date(event.date).toLocaleDateString()}
                        </Text>
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: '#403e3a', height: 'auto' }}>
                        <Text style={styles.Description}>
                            {event.description}
                        </Text>
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: 'black', width: 80 }}>
                        <TouchableOpacity onPress={toggleSaveButton} style={{ marginTop: 10 }} >
                            <Icon
                                name='save'
                                type='font-awesome'
                                size={40}
                                color={isEventSaved ? '#f5b800' : 'white'}
                            />
                            <Text style={styles.ButtonText}>{isEventSaved ? 'Unsave Event' : 'Save Event'}</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col size={1} style={{ backgroundColor: 'black', width: 75 }}>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Icon
                                name='share-alt'
                                type='font-awesome'
                                size={40}
                                color={'white'}
                            />
                            <Text style={styles.ButtonText}>Share Event</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </View>
        </ScrollView >

    );
}

// settings for header
EventScreen.navigationOptions = (props) => {

    var event = props.navigation.getParam('event');

    return {
        headerTitle: event.title,
        headerTitleStyle: {
            fontSize: 22,
        },

        headerStyle: {
            backgroundColor: 'black',
        },

        headerTintColor: 'white',
    }
}

const styles = StyleSheet.create({
    ButtonText: {
        margin: 10,
        color: 'white',
        textAlign: 'center',
    },
    Description: {
        color: 'white',
        backgroundColor: 'black',
        margin: 2,
        marginLeft: 0,
        marginRight: 0,
        padding: 10
    }
});

export default EventScreen;