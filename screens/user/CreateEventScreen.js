import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  Vibration
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  Textarea,
  Input,
  Item,
  Button,
  Icon,
  Header,
  Left,
  Body,
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
  uploadEventPhoto,
  getCurrentLocation,
  combineDateAndTime,
  stringifyDate,
  stringifyTime,
} from "../helper/createEventHelper";
import { ActivityIndicator } from "react-native";
import Colors from '../../constants/Colors';
import { Ionicons, Fontisto } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CreateEventScreen = (props) => {
  var initEvent = false;
  if (props.navigation.getParam('event', 0)) {
    console.log('initial event was passed');
    initEvent = props.navigation.getParam('event');
  }

  //Initial states of event screen
  const initTitle = initEvent ? initEvent.title : "";
  const initDescription = initEvent ? initEvent.description : "";
  const initCategory = initEvent ? initEvent.category : "";
  const initDate = initEvent ? new Date(initEvent.date) : new Date();
  const initTime = initEvent ? new Date(initEvent.date) : new Date();
  const initImage = initEvent ? initEvent.image : "";
  const initLocation = initEvent ? { latitude: parseFloat(initEvent.location.latitude), longitude: parseFloat(initEvent.location.latitude) } : "";

  //These states updated as user interacts with the screen
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [location, setLocation] = useState(initLocation);
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
  const onChangeDate = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (e, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === "ios");
    setTime(currentTime);
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
        console.log("dispatching getEvents from create page");
        dispatch(eventActions.getEvents());
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
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            padding: 12,
            //alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text, { color: Colors.purpleBackground, paddingBottom: 5, fontSize: 18 }}>Image</Text>
          <View style={{ alignItems: "center", paddingTop: 8 }}>
            {image == "" ? (
              <View style={{
                backgroundColor: "white",
                borderRadius: 3,
                borderColor: Colors.lightGrey,
                borderWidth: 1,
                padding: 10
              }}>
                <TouchableOpacity onPress={updateEventPhoto}>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
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
                  <Image source={{ uri: image }} style={styles.eventImage} />
                </TouchableOpacity>
              )}
          </View>
          <View style={{ paddingBottom: 15, paddingTop: 15 }}>
            <Text style={styles.text, { color: Colors.purpleBackground, paddingBottom: 5, fontSize: 18 }}>Title</Text>
            <Item regular style={{ borderColor: Colors.lightGrey, borderRadius: 5 }}>
              <Input
                style={styles.titleStyle}
                onChangeText={(text) => setTitle(text)}
                value={title}
                placeholder={"Add a title..."}
              />
            </Item>
            <Text></Text>
            <Text style={styles.text, { color: Colors.purpleBackground, paddingBottom: 5, fontSize: 18 }}>Description</Text>
            <Item regular style={{ borderColor: Colors.lightGrey, borderRadius: 5 }}>
              <Textarea
                style={styles.descriptionStyle}
                onChangeText={(text) => setDescription(text)}
                value={description}
                placeholder={"Add a description..."}
                multiline
                numberOfLines={5}
              />
            </Item>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            //alignItems: "center",
            alignContent: "center",
            padding: 10,
            paddingTop: 0,
            zIndex: 10,
            width: SCREEN_WIDTH,
          }}
        >
          <Text style={styles.text}>Category</Text>
          {Platform.OS === "ios" ? (
            <DropDownPicker
              items={[
                { label: "Music", value: "music" },
                { label: "Sports", value: "sports" },
                { label: "Meeting", value: "meeting" },
                { label: "Party", value: "party" },
                { label: "Protest", value: "protest" },
                { label: "Food", value: "food" },
                { label: "Market", value: "market" },
                { label: "Discussion", value: "discussion" },
                { label: "Political", value: "political" },
                { label: "Other", value: "other" },
              ]}
              defaultValue={initCategory}
              placeholder="Select a category"
              containerStyle={{
                height: 50,
                width: SCREEN_WIDTH * 0.95,
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{ borderColor: Colors.lightGrey, borderWidth: 0.5 }}
              dropdownStyle={{ borderColor: Colors.lightGrey, height: 300 }}
              itemStyle={{ alignItems: "center" }}
              onChangeItem={(category) => setCategory(category.value)}
            />
          ) : (
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
                style={{ borderColor: Colors.darkGrey, borderWidth: 0.5, color: "black" }}
                onValueChange={(value) => setCategory(value)}
              />
            )}
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Location</Text>
          <Button
            iconRight
            light
            onPress={toggleShowMap}
            style={styles.buttonStyle}
          >
            <Text
              style={{
                fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
              }}
            >
              {"Drop a "}
            </Text>
            <Icon name="pin" />
          </Button>
        </View>
        {console.log(`Here ${location.latitude}`)}
        {showMap && location.latitude && (
          <View style={styles.container}>
            <Modal
              onSwipeComplete={toggleShowMap}
              swipeDirection={"down"}
              backdropOpacity={0.3}
              onBackdropPress={toggleShowMap}
              swipeThreshold={100}
              TransitionOutTiming={0}
              borderRadius={10}
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
                  Hold pin to drag
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
            </Modal>
          </View>
        )}
        <View style={styles.container}>
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
                fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
              }}
            >
              {stringifyDate(date)}
            </Text>
          </Button>
        </View>
        {showDate && (
          <DateTimePicker value={date} mode={"date"} onChange={onChangeDate} />
        )}
        <View style={styles.container}>
          <Text style={styles.text}>Time</Text>
          <Button
            iconRight
            light
            onPress={toggleShowTime}
            style={styles.buttonStyle}
          >
            <Text>{stringifyTime(time)}</Text>
          </Button>
        </View>
        {showTime && (
          <DateTimePicker
            value={time}
            mode={"time"}
            is24Hour={false}
            onChange={onChangeTime}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            paddingTop: 15,
            paddingBottom: 10
          }}
        >
          <Button
            round
            light
            onPress={saveEvent}
            style={{
              borderColor: Colors.purpleButton,
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: Colors.purpleButton,
              borderRadius: 5,
              borderWidth: 2,
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                textAlign: "center",
                fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
              }}
            >
              Submit
						</Text>
          </Button>
        </View>
        <View style={styles.container}>
          <Text
            style={{
              color: "gray",
              fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
            }}
          >
            Note: If you are hosting this event at a private location, we
            recommend not using the exact location of your address but somewhere
            nearby. Include a contact in the description where people can ask
            you directly for the address.
					</Text>
        </View>
      </SafeAreaView>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 0,
    marginBottom: '3%'
    //width: Dimensions.get('window').width,
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
    fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
    fontSize: 18,
    color: Colors.purpleBackground,
  },
  dropdownStyle: {
    width: 100,
  },
  titleStyle: {
    height: 50,
    //borderColor: "gray",
    //borderWidth: 1,
    width: 350,
    fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
    fontSize: 16,
  },
  descriptionStyle: {
    //borderColor: "gray",
    //borderWidth: 1,
    width: 350,
    height: 120,
    marginTop: 5,
    fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
    fontSize: 16,
  },
  modal: {
    flex: 1,
    marginTop: 300,
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    maxHeight: SCREEN_HEIGHT * 0.6,
    backgroundColor: "#2d3436",
  },
  mapStyle: {
    zIndex: -1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.85,
  },
  buttonStyle: {
    height: 50,
    width: '98%',
    color: "black",
    borderColor: Colors.lightGrey,
    borderWidth: 0.5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: Colors.purpleBackground,
    borderWidth: 3,
    height: 200,
    marginBottom: 15,
    width: SCREEN_WIDTH * 0.9,
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
