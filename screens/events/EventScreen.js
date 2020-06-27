import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { Thumbnail } from 'native-base';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';


const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

const EventScreen = (props) => {
    const [isEventSaved, setEventSaved] = useState(false);
    var saveIconColor = "black";

    useEffect(() => {
        if (isEventSaved) {
            saveIconColor = "yellow";
        } else { saveIconColor = "black" }
        console.log(saveIconColor);
    }, [isEventSaved])

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
                    <Col size={1} style={{ backgroundColor: 'black', height: 95 }}>
                        <Thumbnail style={{ marginLeft: 10, marginTop: 5 }} source={{ uri: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg' }} />
                        <Text style={{ color: 'white' }}>
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
                    <Col size={1} style={{ backgroundColor: 'white', height: 'auto' }}>
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
                        <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={1}>
                            <Icon
                                name='save'
                                type='font-awesome'
                                size={40}
                                color={isEventSaved ? 'yellow' : 'white'}
                                onPress={toggleSaveButton}
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
    Title: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        textAlign: 'center',
        padding: ' 4%'
    },
    ButtonText: {
        margin: 10,
        color: 'white',
        textAlign: 'center',
    },
    Description: {
        color: 'white',
        backgroundColor: 'black',
        margin: 2,
        padding: 10,
        marginLeft: 0,
        marginRight: 0,
        fontSize: 15
    }
});

export default EventScreen;