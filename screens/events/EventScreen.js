import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Thumbnail, Right, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import InsetShadow from 'react-native-inset-shadow';

import formatStandardTime from '../helper/timeFormater'
import { makeFullAddress } from '../helper/calloutHelper';
import Colors from '../../constants/Colors';
import * as eventActions from '../../store/actions/events';
// this function returns the screen elements for the event screen
// this should take the event or event id as a prop. we should also
// save the isEventSaved in a redux store for persistance.  
const EventScreen = (props) => {
    const [isEventSaved, setEventSaved] = useState(false);
    const event = props.navigation.getParam('event');
    console.log("this is the event " + JSON.stringify(event));
    const dispatch = useDispatch();

    //  for icon color selection
    const toggleSaveButton = () => {
        // dispatch action
        if (!isEventSaved) {
            dispatch(eventActions.saveEvent(event))
        } else { // indicating user unsaved the event
            dispatch(eventActions.unsaveEvent(event))
        }
        setEventSaved(!isEventSaved);
        console.log(isEventSaved);
    };

    return (

        <ScrollView style={{ backgroundColor: Colors.darkGrey }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <View style={styles.titleDescriptionContainer}>
                    <Text style={styles.titleText}>{event.title}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <View style={styles.hostContent}>
                        <Thumbnail source={{ uri: event.host.profile }} />
                        <Text style={styles.hostNameText}>{event.host.name}</Text>
                    </View>
                </View>
            </View>
            <Grid>

                <Col size={1} style={{ height: 275, paddingHorizontal: 15 }}>
                    <InsetShadow>
                        <Image
                            style={{ flex: 1 }}
                            source={{ uri: event.image }}
                        />
                    </InsetShadow>

                </Col>
            </Grid>
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 15 }}>
                <Left size={2} style={{ height: 'auto' }}>
                    <Text style={{ fontSize: 17, color: 'white', marginTop: 10, margin: 5 }}>
                        {makeFullAddress(event.location.address)}
                    </Text>
                </Left>
                <Right size={2} style={{ height: 'auto' }}>
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
                </Right>
            </View>
            <Grid>
                <Col size={1} style={{ height: 'auto' }}>
                    <InsetShadow shadowRadius={1} shadowColor='white' left={false} right={false} shadowOpacity={1}>
                        <Text style={styles.Description}>
                            {event.description}
                        </Text>
                    </InsetShadow>
                </Col>
            </Grid>
            <Grid>
                <Col>
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
                <Col size={1} style={{ width: 75 }}>
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
        </ScrollView >

    );
}

// settings for header
EventScreen.navigationOptions = (props) => {
    return {
        headerTitle: "Event Details",
        headerTitleStyle: {
            fontSize: 28,
            fontFamily: 'jack-silver',
        },
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerTitleAllowFontScaling: true
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 15
    },
    titleDescriptionContainer: {
        justifyContent: 'center',
        flex: 4,
    },
    hostContainer: {
        alignSelf: 'flex-end',
        flex: 2
    },
    hostContent: {
        alignItems: 'center',
    },
    hostNameText: {
        paddingTop: 5,
        fontSize: 13,
        color: 'white'
    },
    titleText: {
        color: 'white',
        fontSize: 32
    },
    ButtonText: {
        margin: 10,
        color: 'white',
        textAlign: 'center',
    },
    Description: {
        color: 'white',
        backgroundColor: Colors.darkGrey,
        marginVertical: 2,
        marginLeft: 0,
        marginRight: 0,
        paddingHorizontal: 20,
        paddingVertical: 17,
        fontSize: 17
    }
});

export default EventScreen;