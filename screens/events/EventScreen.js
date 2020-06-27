import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { Container, Header, Thumbnail, Left, Body, Right, Button, Title } from 'native-base';
import { Icon, Tile } from 'react-native-elements';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
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

        <ScrollView>
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
                    <Col size={1} style={{ backgroundColor: '#00CE9F', height: 75 }}>
                        <Thumbnail style={{ marginLeft: 10, marginTop: 5 }} source={{ uri: 'https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg' }} />
                        <Text>
                            HostName
                        </Text>
                    </Col>
                    <Col size={4} style={{ backgroundColor: '#fcba03', height: 75 }}>
                        <Text>Location and Time</Text>
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: '#f0548b', height: 'auto' }}>
                        <Text>description</Text>
                    </Col>
                </Grid>
                <Grid>
                    <Col size={1} style={{ backgroundColor: '#f0548b', width: 75 }}>
                        <TouchableOpacity>
                            <Icon
                                name='save'
                                type='font-awesome'
                                size={40}
                                color={isEventSaved ? 'yellow' : 'black'}
                                onPress={toggleSaveButton}
                            />
                            <Text>Save Event</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col size={1} style={{ backgroundColor: '#f0548b', width: 75 }}>
                        <TouchableOpacity>
                            <Icon
                                name='share-alt'
                                type='font-awesome'
                                size={40}
                                color={'black'}
                            />
                            <Text>Share Event</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col size={4} style={{ backgroundColor: '#fcba03' }}>

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
    }
}
const styles = StyleSheet.create({
    Title: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        textAlign: 'center',
        padding: ' 4%'
    }
});

export default EventScreen;