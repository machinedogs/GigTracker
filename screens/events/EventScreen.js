import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Thumbnail, Right, Left } from 'native-base';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Button } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import InsetShadow from 'react-native-inset-shadow';

import { formatStandardTime } from '../helper/timeFormater'
import { makeFullAddress } from '../helper/calloutHelper';
import Colors from '../../constants/Colors';
import * as eventActions from '../../store/actions/events';
import * as userActions from '../../store/actions/user';

// this function returns the screen elements for the event screen
// this should take the event or event id as a prop. we should also
// save the isEventSaved in a redux store for persistance.  

const EventScreen = (props) => {
    const userName = useSelector(state => state.user.userName);
    const savedEvents = useSelector(state => state.events.savedEvents);
    const goingEvents = useSelector(state => state.user.goingEvents);
    const event = props.navigation.getParam('event');
    console.log("this is the event " + JSON.stringify(event));
    // See if user previously saved the event
    var initialEventSaveState;
    const existingSavedIndex = savedEvents.findIndex(myEvent => myEvent.event === event.event)
    if (existingSavedIndex >= 0) { // check if index exists
        initialEventSaveState = true;
    } else {
        initialEventSaveState = false;
    }
    // See if user has already said they are going to an event
    var initialEventGoingState;
    const existingGoingIndex = goingEvents.findIndex(myEvent => myEvent.event === event.event)
    if (existingGoingIndex >= 0) { // check if index exists
        initialEventGoingState = true;
    } else {
        initialEventGoingState = false;
    }

    const [isEventSaved, setEventSaved] = useState(initialEventSaveState);
    const [isGoing, setGoing] = useState(initialEventGoingState);

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

    const toggleGoingButton = () => {
        // dispatch action
        if (!isGoing) {
            dispatch(userActions.addToGoingEvents(event))
        } else { // indicating user is no longer going to the event
            dispatch(userActions.removeFromGoingEvents(event))
        }
        setGoing(!isGoing);
        console.log(isGoing);
    };

    return (
            <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
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
                    <Left size={2} style={{ height: 'auto', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>
                            {makeFullAddress(event.location.address)}
                        </Text>
                    </Left>
                    <Right size={2} style={{ height: 'auto' }}>
                        {Platform.OS === 'ios' ?
                            (
                                <Text style={{ fontSize: 35, color: 'black' }}>
                                    {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </Text>

                            ) :
                            (
                                // format time for android
                                <Text style={{ fontSize: 35, color: 'black' }}>
                                    {formatStandardTime(event.date)}
                                </Text>
                            )}

                        <Text style={{ fontSize: 20, color: 'black' }}>
                            {new Date(event.date).toLocaleDateString()}
                        </Text>
                    </Right>
                </View>
                <Grid>
                    <Col size={1} style={{ height: 'auto', justifyContent: 'center' }}>
                        <InsetShadow shadowRadius={1} shadowColor='black' left={false} right={false} shadowOpacity={1}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 }}>
                                <Text style={styles.goingText}>
                                    50 People Going
                            </Text>
                                <TouchableOpacity>
                                    <View style={{
                                        backgroundColor: isGoing ? '#f5b800' : Colors.lightBackground,
                                        borderRadius: 5,
                                        borderColor: isGoing ? '#f5b800' : Colors.lightBackground,
                                        borderWidth: 2,
                                        paddingHorizontal: 10
                                    }}>
                                        <Button
                                            title={isGoing ? 'Going' : 'Going'}
                                            color='black'
                                            onPress={toggleGoingButton}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </InsetShadow>
                    </Col>
                </Grid>
                <View style={{ padding: 15 }}>
                    <Text style={styles.Description}>
                        {event.description}
                    </Text>
                </View>
                <Grid>
                    {(userName != event.host.name && userName) ? // make sure user is not the host and is logged in
                        (<Col>
                            <TouchableOpacity onPress={toggleSaveButton} style={{ marginTop: 10, marginBottom: 10 }} >
                                <Icon
                                    name='save'
                                    type='font-awesome'
                                    size={40}
                                    color={isEventSaved ? '#f5b800' : 'black'}
                                />
                                <Text style={styles.ButtonText}>{isEventSaved ? 'Unsave Event' : 'Save Event'}</Text>
                            </TouchableOpacity>
                        </Col>) : null
                    }
                    <Col size={1} style={{ width: 75 }}>
                        <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }}>
                            <Icon
                                name='share-alt'
                                type='font-awesome'
                                size={40}
                                color={'black'}
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
        headerTitle: "event details",
        headerTitleStyle: {
            fontSize: 30,
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
        color: 'black'
    },
    titleText: {
        color: 'black',
        fontSize: 32
    },
    ButtonText: {
        margin: 10,
        color: 'black',
        textAlign: 'center',
    },
    Description: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 17
    },
    goingText: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 20
    }
});

export default EventScreen;