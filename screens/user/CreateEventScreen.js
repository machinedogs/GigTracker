import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Platform, ScrollView, SafeAreaView, Alert, TouchableOpacity, Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Textarea, Input, Item, Button, Icon, Header, Left, Body, Right, Title } from "native-base";
//import Modal from 'react-native-modal';
import Mapview, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import MapStyle from '../../constants/MapStyle';
import { useDispatch } from 'react-redux';

import Event from '../../models/event';
import MapView from 'react-native-maps';
import * as eventActions from '../../store/actions/events';

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

const MapScreen = event => {

  let initTitle = event.title ? event.title : '';
  let initDescription = event.description ? event.description : '';
  let initLocation = event.latitude ? { latitude: event.latitude, longitude: event.longitude } : curLoc;
  let initCategory = event.category ? event.category : '';
  let initDate = event.date ? event.date : new Date(0);

  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [location, setLocation] = useState(initLocation);
  const [date, setDate] = useState(new Date());
  //SET TIME
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [category, setCategory] = useState(initCategory);
  const [showMap, setShowMap] = useState(false);

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
    //setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = () => { };

  const toggleShowDate = () => {
    showDate ? setShowDate(false) : setShowDate(true);
  };

  const toggleShowTime = () => {
    showTime ? setShowTime(false) : setShowTime(true);
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
    return mm + '/' + dd + '/' + yyyy;
  }

  const saveEvent = () => {
    if (title && description && location && date && category) {
      // constructor(id, title, description, date,image, category,location, host ) 
      const newEvent = new Event(1000, title, description, date, null, category.valuestringifyDate(date), {
        profile: '',
        name: '',
        email: ''
      }, {
        latitude: location.latitude,
        longituded: location.longitude
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 12 }}>
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', flex: 1 }}>
          </View>
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
            style={{ borderColor: 'gray', borderWidth: 1, }}
            dropdownStyle={{ borderColor: 'gray', height: 300 }}
            itemStyle={{ alignItems: 'center' }}
            onChangeItem={category => setCategory(category)}
          />
        </View>
        <View style={styles.container}>
          <Text>Location:</Text>
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
            <Text>Drop a pin...</Text>
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
              <Header style={{backgroundColor: '#2d3436'}}>
              <Left>
              </Left>
              <Body>
                <Title style={{color: '#fff'}}>Select location</Title>
              </Body>
              <Right>
                <Button transparent onPress={toggleShowMap}>
                  <Icon name='md-checkmark' />
                </Button>
              </Right>
            </Header>
              <View style={{backgroundColor: '#2d3436', zIndex: 100, borderColor: '#2d3436'}}>
                <Text style={{ color: 'white', padding: 10, fontSize: 15 }}>Hold the pin down for a second before dragging...</Text>
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
          <Text>Date:</Text>
          <Button iconRight light onPress={toggleShowDate} style={styles.buttonStyle}>
            <Text>{stringifyDate(date)}</Text>
            <Icon name='calendar' />
          </Button>
        </View>
        {showDate && (
          <DateTimePicker
            value={date}
            mode={'date'}
            onChange={onChangeDate}
            isVis
          />
        )}
        <View style={styles.container}>
          <Text>Time:</Text>
          <Button iconRight light onPress={toggleShowTime} style={styles.buttonStyle}>
            <Text>Select a time...</Text>
            <Icon name='clock' />
          </Button>
        </View>
        {showTime && (
          <DateTimePicker
            value={date}
            mode={'time'}
            is24Hour={true}
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
              textAlign: 'center'
            }}>Submit</Text>
          </Button>
        </View>
        <View style={styles.container}>
          <Text style={{ color: 'gray' }}>Note: If you are hosting this event at a private location, we recommend not using the exact
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
  textInButtonStyle: {

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
  modalButton: {
    height: 50,
    width: 50,
    borderRadius: 20,
    color: 'black',
    borderColor: 'blue',
    backgroundColor: '#84817a',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MapScreen;