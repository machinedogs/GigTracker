import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  Vibration,
  Keyboard
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  Input,
  Button,
  Header,
  Left,
  Right,
  Title,
} from "native-base";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { useDispatch } from "react-redux";
import Geocoder from 'react-native-geocoding';
import InsetShadow from 'react-native-inset-shadow'
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import MapStyle from "../../constants/MapStyle";
import eventBuilder from "../../models/createEvent";
import * as eventActions from "../../store/actions/events";
import {
  uploadEventPhoto,
  getCurrentLocation,
  combineDateAndTime,
  stringifyDate,
  stringifyTime,
  createEventFormIsValid
} from '../../helper/createEventHelper';
import Colors from '../../constants/Colors';
import NeumorphicView from '../../components/NeumorphicView';

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

Geocoder.init("AIzaSyBWXt03TgEnGb9oIeTPXgB1dyGtSsG9IAs");

const CreateEventScreen = (props) => {
  var initEvent = false;
  if (props.navigation.getParam('event', 0)) {
    console.log('initial event was passed');
    initEvent = props.navigation.getParam('event');
  }

  //Initial states of event screen
  const initTitle = initEvent ? initEvent.title : null;
  const initDescription = initEvent ? initEvent.description : null;
  const initCategory = initEvent ? initEvent.category : null;
  const initDate = initEvent ? new Date(initEvent.date) : new Date();
  const initTime = initEvent ? new Date(initEvent.date) : new Date();
  const initImage = initEvent ? initEvent.image : null;
  const initLocation = initEvent ? {
    latitude: parseFloat(initEvent.location.latitude),
    longitude: parseFloat(initEvent.location.latitude)
  } : null;
  const initAddress = initEvent ? initEvent.location.address : null;

  //These states updated as user interacts with the screen
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [location, setLocation] = useState(initLocation);
  const [address, setAddress] = useState(initAddress);
  const [date, setDate] = useState(initDate);
  const [time, setTime] = useState(initTime);
  const [category, setCategory] = useState(initCategory);
  const [image, setImage] = useState(initImage);

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const dispatch = useDispatch();

  let mapRef = useRef(null);
  let markerRef = useRef(null);

  //Updates event photo
  const updateEventPhoto = async () => {
    var eventPhotoRatio = [4, 3];
    setImage(await uploadEventPhoto(eventPhotoRatio));
  };

  useEffect(() => {
    getLocation();
    if (props.navigation.getParam('event', 0)) {
      console.log('load initital location');
      setLocation(initEvent.location);
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
  const onChangeDate = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    toggleShowDate();
  };

  const onChangeTime = (selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === "ios");
    setTime(currentTime);
    toggleShowTime();
  };

  const toggleShowDate = () => {
    showDate ? setShowDate(false) : setShowDate(true);
  };

  const toggleShowTime = () => {
    showTime ? setShowTime(false) : setShowTime(true);
  };

  const saveEvent = async () => {
    console.log(`Category is here.... ${category}`);
    //verify that event is complete
    if (createEventFormIsValid(
      title,
      description,
      location.latitude,
      location.longitude,
      address,
      date,
      time,
      category,
      image.length
    )) {
      const newEvent = new eventBuilder(
        title,
        description,
        combineDateAndTime(date, time),
        image,
        category,
        location.latitude,
        location.longitude,
        address // if user just drags pin, this is null and that is ok. Server will set it
      );
      if (initEvent) {
        //edit existing event
        console.log(`Dispatching event to be edited: ${newEvent.title}`);
        await dispatch(eventActions.editEvent(newEvent, initEvent.id));
        props.navigation.navigate("UserProfile");
      }
      else {
        //create new event
        console.log(`Dispatching event to be created ${newEvent.title}`);
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
    }
  };

  //Sets location as user moves the marker on map
  const handleDragEnd = (e) => {
    setLocation({
      latitude: parseFloat(e.nativeEvent.coordinate.latitude),
      longitude: parseFloat(e.nativeEvent.coordinate.longitude),
    });
    // Get address from geocoding api
    Geocoder.from(
      parseFloat(e.nativeEvent.coordinate.latitude),
      parseFloat(e.nativeEvent.coordinate.longitude)
    )
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const handlePinDragStart = () => {
    Vibration.vibrate()
  }

  //This determines whether to show the map or not for user to pick location
  const toggleShowMap = () => {
    showMap ? setShowMap(false) : setShowMap(true);
  };

  console.log(date, time)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
      <TouchableWithoutFeedback
        onPress={() => { Keyboard.dismiss(); }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              padding: 12,
              justifyContent: "center",
            }}
          >
            <Text style={styles.text}>Image</Text>
            <View style={{ alignItems: "center", paddingTop: 8 }}>
              {!image ? (
                <View style={styles.uploadImageButton}>
                  <TouchableOpacity onPress={updateEventPhoto}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                          fontFamily: "Helvetica",
                          paddingRight: 7,
                        }}
                      >
                        {"Upload Image"}
                      </Text>
                      <Fontisto
                        name="picture"
                        color="black"
                        size={28}
                        style={{
                          alignContent: 'center',
                          justifyContent: 'center'
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (

                  <TouchableOpacity
                    style={styles.eventImageContainer}
                    onPress={updateEventPhoto}
                  >
                    <InsetShadow>
                      <Image source={{ uri: image }} style={styles.eventImage} />
                    </InsetShadow>
                  </TouchableOpacity>
                )}
            </View>

            <Text></Text>

            <Text style={styles.text}>Title</Text>
            <NeumorphicView>
              <Input
                //style={styles.titleStyle}
                onChangeText={(text) => setTitle(text)}
                value={title}
                testID="titleText"
                placeholder={"Add a title..."}
                maxLength={77}
                style={{ fontSize: 17, paddingLeft: 10, fontFamily: 'Helvetica' }}
              />
            </NeumorphicView>

            <Text></Text>

            <Text style={styles.text}>Description</Text>
            <NeumorphicView textArea>
              <Input
                onChangeText={(text) => setDescription(text)}
                value={description}
                placeholder={"Add a description..."}
                multiline
                numberOfLines={5}
                style={{ fontSize: 17, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, fontFamily: 'Helvetica' }}
                textAlignVertical='top'
              />
            </NeumorphicView>
            <Text></Text>
            <Text style={styles.text}>Category</Text>
            <View style={styles.buttonStyle}>
              <RNPickerSelect
                items={[
                  { label: "Music", value: "music" },
                  { label: "Sports", value: "sports" },
                  { label: "Art", value: "art" },
                  { label: "Meeting", value: "meeting" },
                  { label: "Party", value: "party" },
                  { label: "Protest", value: "protest" },
                  { label: "Food", value: "food" },
                  { label: "Market", value: "market" },
                  { label: "Discussion", value: "discussion" },
                  { label: "Political", value: "political" },
                  { label: "Other", value: "other" },
                ]}
                placeholder={{ label: "Select a category", value: "placeHolder", "key": "placeholder" }}
                onValueChange={(value) => setCategory(value)}
                useNativeAndroidPickerStyle
                style={{
                  placeholder: {
                    fontFamily: "Helvetica",
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center'
                  },
                  viewContainer: {
                    alignItems: Platform.OS === 'ios' ? 'center' : null,
                  },
                  inputIOS: {
                    fontSize: 16,
                    fontFamily: "Helvetica"
                  },
                  inputAndroid: {
                    fontSize: 16,
                    fontFamily: "Helvetica",
                    color: 'black'
                  }
                }}
              />
            </View>
            <Text> </Text>
            <Text style={styles.text}>Location</Text>
            <Button
              iconRight
              light
              onPress={toggleShowMap}
              style={styles.buttonStyle}
            >
              <Text
                style={{
                  fontFamily: "Helvetica",
                  fontSize: 16,
                  paddingHorizontal: 10,
                }}
                numberOfLines={2}
                minimumFontScale={.3}
              >
                {address ? address : "Select a location"}
              </Text>
            </Button>
            <Text></Text>
            <Text style={styles.text}>Date</Text>
            <Button
              iconRight
              light
              onPress={toggleShowDate}
              style={styles.buttonStyle}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Helvetica",
                  fontSize: 16
                }}
              >
                {stringifyDate(date)}
              </Text>
            </Button>
            <DateTimePickerModal
              headerTextIOS="Select Event Date"
              isVisible={showDate}
              mode="date"
              onConfirm={onChangeDate}
              onCancel={() => { setShowDate(false) }}
            />
            <Text></Text>
            <Text style={styles.text}>Time</Text>
            <Button
              iconRight
              light
              onPress={toggleShowTime}
              style={styles.buttonStyle}
            >
              <Text style={{ fontFamily: "Helvetica", fontSize: 16 }}>
                {stringifyTime(time)}
              </Text>
            </Button>
            <DateTimePickerModal
              headerTextIOS="Select Event Time"
              isVisible={showTime}
              mode="time"
              onConfirm={onChangeTime}
              onCancel={() => { setShowTime(false) }}
            />
          </View>

          {showMap && location.latitude && (
            <View style={styles.container}>
              <Modal
                onSwipeComplete={toggleShowMap}
                swipeDirection={"down"}
                backdropOpacity={0.3}
                onBackdropPress={toggleShowMap}
                swipeThreshold={100}
                TransitionOutTiming={0}
                borderRadius={5}
                propagateSwipe
              >
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
                      onPress={toggleShowMap}
                      size={28}
                      style={{ paddingRight: 10 }}
                    />
                  </Right>
                </Header>
                <View style={Platform.OS === 'ios' ? ({
                  //justifyContent: "flex-start",
                  //height: 350, 
                  backgroundColor: Colors.darkGrey,
                  alignContent: 'space-evenly',
                  paddingTop: 8,
                  paddingHorizontal: 8
                }) : ({
                  //justifyContent: "flex-start",
                  //height: 175, 
                  backgroundColor: Colors.darkGrey,
                  paddingTop: 8,
                  paddingHorizontal: 8
                })}>
                  <GooglePlacesAutocomplete
                    placeholder={address ? address : 'Search a location...'}
                    fetchDetails={true}
                    suppressDefaultStyles
                    enablePoweredByContainer={false}
                    isRowScrollable={false}
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      console.log(data, details);
                      console.log(details.formatted_address)
                      setAddress(details.formatted_address);
                      const newLat = details.geometry.location.lat;
                      const newLong = details.geometry.location.lng;
                      const newLocation = {
                        "latitude": parseFloat(newLat),
                        "longitude": parseFloat(newLong)
                      }
                      setLocation(newLocation);
                      const newRegion = {
                        latitude: newLat,
                        latitudeDelta: LATITUDE_DELTA,
                        longitude: newLong,
                        longitudeDelta: LONGITUDE_DELTA
                      }
                      mapRef.current.animateToRegion(newRegion, 50);
                    }}
                    query={{
                      key: 'AIzaSyDhUxyaAFozVK1JkgYjmRjetSn-dN8sK-M',
                      language: 'en',
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: Colors.lightBackground,
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        borderRadius: 5,
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                        paddingVertical: Platform.OS === 'ios' ? 0 : 3
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: 'black',
                        fontSize: 16,
                        fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
                      },
                      description: {
                        paddingTop: 5,
                        paddingBottom: 5,
                        color: Colors.darkGrey,
                        backgroundColor: Colors.lightBackground,
                        paddingLeft: 15,
                        fontSize: 16,
                      },
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      padding: 10,
                      paddingHorizontal: 5,
                      fontSize: 16,
                      fontFamily: "Helvetica",
                    }}
                  >
                    or hold pin to drag
								</Text>
                </View>
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
                  onPress={() => {
                    Keyboard.dismiss()
                  }}
                  rotateEnabled={false}
                  showsTraffic={false}
                  toolbarEnabled={true}
                  ref={mapRef}
                  customMapStyle={MapStyle}
                  clusterColor="#341f97"
                >
                  <Marker
                    ref={markerRef}
                    coordinate={{
                      latitude: parseFloat(location.latitude),
                      longitude: parseFloat(location.longitude)
                    }}
                    pinColor="#341f97"
                    tracksViewChanges={false}
                    draggable
                    onDragEnd={handleDragEnd}
                    onDragStart={handlePinDragStart}

                  />
                </MapView>
              </Modal>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 15
            }}
          >
            <View style={{ flex: 1, paddingRight: 20 }}>
              <Text
                style={{
                  color: "gray",
                  fontFamily: "Helvetica",
                }}
              >
                Note: If you are hosting this event at a private location, we
                recommend not using the exact location of your address but somewhere
                nearby. Include a contact in the description where people can ask
                you directly for the address.
              </Text>
            </View>
            <Button round light onPress={saveEvent}
              style={{
                borderColor: Colors.purpleButton,
                alignContent: "center",
                justifyContent: "center",
                backgroundColor: Colors.purpleButton,
                borderRadius: 5,
                borderWidth: 2,
                paddingHorizontal: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.10,
                shadowRadius: 1.41,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "Helvetica"
                }}
              >
                Submit
						</Text>
            </Button>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback >

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 0,
    marginBottom: '3%'
  },
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "flex-start",
    width: SCREEN_WIDTH,
    padding: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    paddingBottom: 5
  },
  dropdownStyle: {
    width: 100,
  },
  uploadImageButton: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 1.41,
    elevation: 2,
  },
  titleStyle: {
    height: 50,
    //borderColor: "gray",
    //borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: '100%',
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  descriptionStyle: {
    //borderColor: "gray",
    //borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '100%',
    height: 120,
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  modal: {
    flex: 1,
    marginTop: 300,
    borderRadius: 5,
    marginLeft: 0,
    marginRight: 0,
    maxHeight: SCREEN_HEIGHT * 0.6,
    backgroundColor: "#2d3436",
  },
  mapStyle: {
    flex: 1,
    zIndex: -1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  buttonStyle: {
    height: 50,
    width: '100%',
    color: "black",
    borderColor: Colors.lightGrey,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.75,
    elevation: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2d3436",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImageContainer: {
    height: 200,
    width: '100%',
  },
  eventImage: {
    height: "100%",
    width: "100%",
  },
  pictureUpload: {
    height: 200,
    marginBottom: 15,
    width: SCREEN_WIDTH * 0.9,
  }
});

export default CreateEventScreen;
