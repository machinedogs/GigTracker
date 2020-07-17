import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    TouchableOpacity,
    Image,
    Vibration,
} from "react-native";
import {
    Header,
    Left,
    Right,
    Title,
} from "native-base";
//import Modal from 'react-native-modal';
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import MapStyle from "../../constants/MapStyle";
import { useDispatch } from "react-redux";
import eventBuilder from "../../models/createEvent";
import * as eventActions from "../../store/actions/events";
import {
    getCurrentLocation,
    combineDateAndTime,
} from "../helper/createEventHelper";
import { ActivityIndicator } from "react-native";
import Colors from '../../constants/Colors';
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const AddLocationScreen = (props) => {

    const [location, setLocation] = useState(props.navigation.getParam('location', {}));
    console.log(location.latitude)

    let mapRef = useRef(null);
    let markerRef = useRef(null);

    useEffect(() => {
        getLocation();
        if (props.navigation.getParam('location', 0)) {
            console.log('load initital location');
            setLocation(props.navigation.getParam('location'));
        }
    }, []);

    const getLocation = async () => {
        const position = await getCurrentLocation();
        const currentLocation = {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
        };
        //console.log("Current Location");
        //console.log(currentLocation);
        if (!location) { setLocation(currentLocation) };
        return currentLocation;
    };

    const saveEvent = async () => {
        console.log(`Category is here.... ${category}`);
        //verify that event is complete
        if (
            title &&
            description &&
            location &&
            location.latitude &&
            location.longitude &&
            date &&
            category &&
            image.length > 3
        ) {
            console.log(category);
            const newEvent = new eventBuilder(
                title,
                description,
                combineDateAndTime(date, time),
                image,
                category,
                location.latitude,
                location.longitude
            );
            if (initEvent) {
                //edit existing event
                console.log(`Dispatching event to be edited: ${newEvent.title}`);
                await dispatch(eventActions.editEvent(newEvent, initEvent.id));
                props.navigation.navigate("UserProfile");
            }
            else {
                //create new event
                console.log(`Dispatching event ${newEvent.title}`);
                await dispatch(eventActions.createEvent(newEvent));
                props.navigation.navigate("Home");
            }
        } else {
            //alert that event is not valid
            Alert.alert(
                "Incomplete form",
                "Fill out all event info before submitting.",
                [{ text: "OK" }]
            );
            console.log(`Category is here.... ${category} and ${category.value}`);
        }
    };

    //Sets location as user moves the marker on map
    const handleDragEnd = (e) => {
        setLocation({
            latitude: parseFloat(e.nativeEvent.coordinate.latitude),
            longitude: parseFloat(e.nativeEvent.coordinate.longitude),
        });
        console.log("lat: " + location.latitude + " long: " + location.longitude);
    };

    const handleDragStart = () => {
        Vibration.vibrate()
    }

    //This determines whether to show the map or not for user to pick location
    const toggleShowMap = () => {
        showMap ? setShowMap(false) : setShowMap(true);
    };

    return (
        <View style={styles.container}>
            <Header style={{ backgroundColor: Colors.darkGrey, }}>
                <Left></Left>
                <View>
                    <Title
                        style={{
                            color: "#fff",
                            fontFamily: 'jack-silver',
                            fontSize: 26,
                            paddingBottom: 10,
                            paddingTop: Platform.OS === 'ios' ? 0 : 10,
                            width: SCREEN_WIDTH * 0.75
                        }}
                    >
                        Select Location
									</Title>
                </View>
                <Right>
                    <Ionicons
                        name="md-checkmark"
                        color='white'
                        //onPress={toggleShowMap}
                        size={28}
                        style={{ paddingRight: 10 }}
                    />
                </Right>
            </Header>
            <GooglePlacesAutocomplete
                nearbyPlacesAPI='GooglePlacesSearch'
                placeholder='Search a location...'
                fetchDetails={true}
                enablePoweredByContainer={false}
                suppressDefaultStyles={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    const newLat = details.geometry.location.lat;
                    const newLong = details.geometry.location.lng;
                    const newLocation = {
                        "latitude": newLat,
                        "longitude": newLong
                    }
                    console.log(newLat);
                    setLocation(newLocation);
                }}
                query={{
                    key: 'AIzaSyDhUxyaAFozVK1JkgYjmRjetSn-dN8sK-M',
                    language: 'en',
                }}
                styles={{
                    container: {
                        zIndex: 999
                    },
                    textInputContainer: {
                        backgroundColor: '#fff',
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        height: 50,
                        borderRadius: 4,
                        paddingHorizontal: 16
                    },
                    textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: 'black',
                        fontSize: 16,
                        fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                        fontSize: 16,
                    },
                    listView: {
                        height: 175,
                        backgroundColor: Colors.lightBackground,
                        paddingHorizontal: 16,
                        zIndex: 1000
                    },
                    description: {
                        color: Colors.darkGrey,
                        fontSize: 16,
                        fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
                    },
                    separator: {
                        height: 12
                    }
                }}
            />
            <View
                style={{
                    backgroundColor: Colors.darkGrey,
                    zIndex: 100,
                    borderColor: "#2d3436",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        padding: 10,
                        fontSize: 15,
                        fontFamily:
                            Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
                    }}
                >
                    Or hold pin to drag
								</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    initialRegion={{
                        latitude: parseFloat(location.latitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitude: parseFloat(location.longitude),
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    showsMyLocationButton
                    rotateEnabled={false}
                    showsTraffic={false}
                    toolbarEnabled={true}
                    ref={mapRef}
                    customMapStyle={MapStyle}
                    clusterColor="#341f97"
                >
                    <Marker
                        ref={markerRef}
                        coordinate={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }}
                        pinColor="#341f97"
                        tracksViewChanges={false}
                        draggable
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                    />
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: "center",
        justifyContent: "flex-start",
        width: SCREEN_WIDTH,
        padding: 10,
        backgroundColor: "#fff",
    },
})

export default AddLocationScreen; 