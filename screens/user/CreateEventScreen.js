import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Platform, ScrollView, SafeAreaView, Alert, TouchableOpacity, Modal, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Textarea, Input, Item, Button, Icon, Header, Left, Body, Right, Title } from "native-base";
//import Modal from 'react-native-modal';
import Mapview, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import MapStyle from '../../constants/MapStyle';
import { useDispatch } from 'react-redux';

import Event from '../../models/event';
import Location from '../../models/location';
import Host from '../../models/host';
import MapView from 'react-native-maps';
import * as eventActions from '../../store/actions/events';
import {
  openImagePickerAsync,
  uploadImage,
  getImage,
} from "../../screens/helper/ImageHelpers";

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

async function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    position => {
      let region = {
        latitude: parseFloat(position.coords.latitude),
        //latitudeDelta: LATITUDE_DELTA,
        longitude: parseFloat(position.coords.longitude),
        //longitudeDelta: LONGITUDE_DELTA
      };
    },
    error => console.log(error),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
  );
}

const curLoc = getCurrentLocation();

combineDateAndTime = function (date, time) {
  timeString = time.getHours() + ':' + time.getMinutes() + ':00';

  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Jan is 0, dec is 11
  var day = date.getDate();
  var dateString = '' + year + '-' + month + '-' + day;
  var combined = new Date(dateString + ' ' + timeString);

  return combined;
};

const stringifyDate = (date) => {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var wkday = date.getDay();
  if (wkday === 0) wkday = 'Sunday';
  else if (wkday === 1) wkday = 'Monday';
  else if (wkday === 2) wkday = 'Tuesday';
  else if (wkday === 3) wkday = 'Wednesday';
  else if (wkday === 4) wkday = 'Thursday';
  else if (wkday === 5) wkday = 'Friday';
  else if (wkday === 6) wkday = 'Saturday';
  return wkday + ', ' + mm + '/' + dd + '/' + yyyy;
}

const stringifyTime = (time) => {
  var str = time.toTimeString();

}

const CreateEventScreen = event => {

  const initTitle = event.title ? event.title : '';
  const initDescription = event.description ? event.description : '';
  const initLocation = event.latitude ? { latitude: event.latitude, longitude: event.longitude } : curLoc;
  const initCategory = event.category ? event.category : '';
  const initDate = event.date ? event.date : new Date();
  const initTime = event.date ? event.date : new Date();
  const initImage = event.image ? event.image : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [location, setLocation] = useState(initLocation);
  const [date, setDate] = useState(initDate);
  const [time, setTime] = useState(initTime);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [category, setCategory] = useState(initCategory);
  const [showMap, setShowMap] = useState(false);
  const [image, setImage] = useState(initImage);

  const dispatch = useDispatch();

  let mapRef = useRef(null);
  let markerRef = useRef(null);

  //  get initial location then animate to that location
  // only do this on mount and unmount of map component 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };
        setLocation(coords);
        mapRef.current.animateToRegion(coords, 1000);
      }, (error) => console.log(error));
  }, []);


  const onChangeDate = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (e, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const toggleShowDate = () => {
    showDate ? setShowDate(false) : setShowDate(true);
  };

  const toggleShowTime = () => {
    showTime ? setShowTime(false) : setShowTime(true);
  };

  const saveEvent = () => {
    if (title && description && location && date && category) {
      // constructor(id, title, description, date,image, category,location, host ) 
      const newEvent = new Event(1000, title, description, date, null, category.value,
        new Location(location.latitude, location.longitude), new Host('', '', ''));
      dispatch(eventActions.createEvent(newEvent));
      event.navigation.navigate('Home');
    } else {
      //alert that event is not valid
      Alert.alert('Incomplete form', 'Fill out all event info before submitting.', [{ text: 'OK' }]);
    }
  }

  const dateTitle = () => {
    return (
      date.toString() ? date.toString() : 'Select date...'
    )
  }

  const handleDragEnd = (e) => {
    setLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    });
    console.log('lat: ' + location.latitude + ' long: ' + location.longitude)
  }

  const toggleShowMap = () => {
    showMap ? setShowMap(false) : setShowMap(true);
  }

  let updateEventPhoto = async () => {
    console.log("Inside update event photo ");
    //Get image from camera library
    var file = await openImagePickerAsync();
    //Get image from firebase
    var imageUrl = await getImage(file);
    setImage(imageUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 12, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Photo</Text>
          <TouchableOpacity
            onPress={updateEventPhoto}
            style={styles.eventImageContainer}
          >
            <Image source={{ uri: image }} style={styles.eventImage} />
          </TouchableOpacity>
          <Text style={styles.text}>Title</Text>
          <Item rounded>
            <Input
              style={styles.titleStyle}
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder={'Add a title...'}
            />
          </Item>
          <Text></Text>
          <Text style={styles.text}>Description</Text>
          <Item rounded>
            <Textarea
              style={styles.descriptionStyle}
              onChangeText={text => setDescription(text)}
              value={description}
              placeholder={'Add a description...'}
              multiline
              numberOfLines={5}
            />
          </Item>
        </View>
        <Text></Text>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 10,
          zIndex: 100
        }}>
          <Text style={styles.text}>Category</Text>
          <DropDownPicker
            items={[
              { label: 'Music', value: 'music' },
              { label: 'Sports', value: 'sports' },
              { label: 'Meeting', value: 'meeting' },
              { label: 'Party', value: 'party' },
              { label: 'Protest', value: 'protest' },
              { label: 'Food', value: 'food' },
              { label: 'Market', value: 'market' },
              { label: 'Discussion', value: 'discussion' },
              { label: 'Political', value: 'political' },
              { label: 'Other', value: 'other' }
            ]}
            defaultValue={initCategory}
            placeholder="Select a category"
            containerStyle={{ height: 50, width: 300, justifyContent: 'center', alignItems: 'center' }}
            style={{ borderColor: 'gray', borderWidth: 1 }}
            dropdownStyle={{ borderColor: 'gray', height: 300 }}
            itemStyle={{ alignItems: 'center' }}
            onChangeItem={category => setCategory(category)}
          />
        </View>
        <View style={styles.container}>
          <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>Location:</Text>
          {/*<GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          currentLocation={true}
          query={{
            key: 'YOUR API KEY',
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              width: 350
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />*/}
          <Button iconRight light onPress={toggleShowMap} style={styles.buttonStyle}>
            <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>Drop a pin...</Text>
            <Icon name='pin' />
          </Button>
        </View>
        {showMap && (
          <View style={styles.container}>
            <Modal
              onSwipeComplete={toggleShowMap}
              swipeDirection={"down"}
              backdropOpacity={.3}
              onBackdropPress={toggleShowMap}
              swipeThreshold={100}
              TransitionOutTiming={0}
              borderRadius={10}
              propagateSwipe
            >
              <Header style={{ backgroundColor: '#2d3436' }}>
                <Left>
                </Left>
                <Body>
                  <Title style={{ color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', fontSize: 20 }}>Select location</Title>
                </Body>
                <Right>
                  <Button transparent onPress={toggleShowMap}>
                    <Icon name='md-checkmark' />
                  </Button>
                </Right>
              </Header>
              <View style={{ backgroundColor: '#2d3436', zIndex: 100, borderColor: '#2d3436' }}>
                <Text style={{ color: 'white', padding: 10, fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>Hold the pin down for a second before dragging...</Text>
              </View>
              <MapView
                initialRegion={{
                  latitude: location.latitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitude: location.longitude,
                  longitudeDelta: LONGITUDE_DELTA
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
                  coordinate={location}
                  pinColor="#341f97"
                  tracksViewChanges={false}
                  draggable
                  onDragEnd={handleDragEnd}
                />
              </MapView>
            </Modal>
          </View>)}
        <View style={styles.container}>
          <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>Date:</Text>
          <Button iconRight light onPress={toggleShowDate} style={styles.buttonStyle}>
            <Text style={{ textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>{stringifyDate(date)}</Text>
            <Icon name='calendar' />
          </Button>
        </View>
        {showDate && (
          <DateTimePicker
            value={date}
            mode={'date'}
            onChange={onChangeDate}
          />
        )}
        <View style={styles.container}>
          <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>Time:</Text>
          <Button iconRight light onPress={toggleShowTime} style={styles.buttonStyle}>
            <Text>{stringifyTime(time)}</Text>
            <Icon name='clock' />
          </Button>
        </View>
        {showTime && (
          <DateTimePicker
            value={time}
            mode={'time'}
            is24Hour={false}
            onChange={onChangeTime}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text></Text>
          <Button round light onPress={saveEvent} style={{
            borderWidth: 1,
            borderColor: "gray",
            alignContent: 'center',
            justifyContent: 'center',
            width: 125,
            height: 50,
            backgroundColor: '#fff',
          }}>
            <Text style={{
              fontSize: 22,
              color: "#2f3640",
              textAlign: 'center',
              fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '',
            }}>Submit</Text>
          </Button>
        </View>
        <View style={styles.container}>
          <Text style={{ color: 'gray', fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '', }}>Note: If you are hosting this event at a private location, we recommend not using the exact
          location of your address but somewhere nearby. Include a contact where people can ask you directly
          for the address.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: SCREEN_WIDTH,
    padding: 10,
    backgroundColor: '#fff'
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '',
    fontSize: 16,
  },
  dropdownStyle: {
    width: 100
  },
  titleStyle: {
    height: 50,
    borderColor: 'gray',
    //borderWidth: 1,
    width: 350,
    fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '',
    fontSize: 16
  },
  descriptionStyle: {
    borderColor: 'gray',
    //borderWidth: 1,
    width: 350,
    height: 120,
    fontFamily: Platform.OS === 'ios' ? 'Sinhala Sangam MN' : '',
    fontSize: 16
  },
  modal: {
    flex: 1,
    marginTop: 300,
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    maxHeight: SCREEN_HEIGHT * 0.6,
    backgroundColor: '#2d3436',
  },
  mapStyle: {
    zIndex: -1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.85,
  },
  buttonStyle: {
    height: 50,
    width: 200,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImageContainer: {
    borderColor: "gray",
    borderWidth: 1,
    height: 170,
    marginBottom: 15,
    width: SCREEN_WIDTH*0.8,
  },
  eventImage: {
    borderColor: "#A5A5A5",
    height: "100%",
    width: "100%",
  },
});

export default CreateEventScreen;