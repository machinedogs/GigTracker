import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { Thumbnail } from 'native-base';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';

import { Col, Grid } from 'react-native-easy-grid';

// this function returns the screen elements for the event screen
// this should take the event or event id as a prop. we should also
// save the isEventSaved in a redux store for persistance.  
const EventScreen = (props) => {

    const [isEventSaved, setEventSaved] = useState(false);

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
                            source={{ uri: 'https://billypenn.com/wp-content/uploads/2019/11/warehouseonwatts-party-1024x576.jpg?resize=994,559' }}
                        />
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: 'black', height: 'auto' }}>
                        <Thumbnail style={{ marginLeft: 10, marginTop: 10 ,marginBottom:5, padding:0}} source={{ uri: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg' }} />
                        <Text style={{ color: 'white',marginBottom:5, marginLeft: 10 }}>
                            HostName
                        </Text>
                    </Col>
                    <Col size={2} style={{ backgroundColor: 'black', height: 80 }}>
                        <Text style={{ fontSize: 15, color: 'white', marginTop: 10 }}>Mt.Airy Philadelphia PA</Text>
                    </Col>
                    <Col size={2} style={{ backgroundColor: 'black', height: 80 }}>
                        <Text style={{ fontSize: 35, marginTop: 10, color: 'white' }}>8:00 PM</Text>
                        <Text style={{ fontSize: 25, color: 'white' }}>6/28/2020</Text>
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: '#403e3a', height: 'auto' }}>
                        <Text style={styles.Description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
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
        </ScrollView>

    );
}

// settings for header
EventScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Title',
        headerTitleStyle: {
            fontSize: 22,
        },
        headerStyle: {
            backgroundColor: 'black'

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