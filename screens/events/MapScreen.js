import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import EventModal from '../../components/eventModal'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import { useTheme } from 'react-navigation/native';

import { EVENTS } from '../../data/dummy-data';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const MapScreen = props => {
  const [events, setEvents] = useState(EVENTS);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  let categories = [{ value: 'All events' }];
  EVENTS.map(event => {
    var count = 0;
    categories.forEach(function (category) {
      if (event.category === category.value) {
        count = count + 1;
      }
    });
    if (count === 0) {
      let category = { value: event.category }
      categories.push(category)
    }
  });
  console.log(categories);

  const filterCategory = (category) => {
    if (category === 'All events') {
      setEvents(EVENTS)
    } else {
      setEvents(EVENTS.filter(event => event.category === category))
    }
    console.log(events);
  };

  // gets called when pin is pressed
  const openEventModal = (event) => {
    console.log("pressing event pin");
    toggleModal();

  }

  //const theme = useTheme();

  return (

    //add a dropdown to choose map style?
    //add dropdown calendar
    <View style={styles.container}>

      <View style={styles.container}>

        <Text style={styles.titleStyle}>GigTracker</Text>
        <View style={styles.topBarStyle}>
          <Dropdown
            label="Category"
            data={categories}
            containerStyle={styles.dropdownStyle}
            textColor='#fff'
            baseColor='#fff'
            selectedItemColor='#c0392b'
            pickerStyle={{ backgroundColor: '#ecf0f1' }}
            itemTextStyle={styles.containerStyle}
            onChangeText={filterCategory}
          />
          <Dropdown
            label="Date"
            data={categories}
            containerStyle={styles.dropdownStyle}
            textColor='#fff'
            baseColor='#fff'
            selectedItemColor='#c0392b'
            pickerStyle={{ backgroundColor: '#ecf0f1' }}
            itemTextStyle={styles.containerStyle}
          />
        </View>
      </View>

      <View style={{ flex: 4 }}>

        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          rotateEnabled={false}
          showsTraffic={false}
          customMapStyle={generatedMapStyle /* theme.dark ? darkMapStyle : lightMapStyle */}
        >
          {events.map(event => (
            <Marker
              coordinate={{ latitude: event.latitude, longitude: event.longitude }}
              title={event.title}
              pinColor="#341f97"
              //image={require('../../assets/splash.png')}
              icon={FlashOnIcon}
              description={event.description}
              key={event.id}
              tracksViewChanges={false}
            ><EventModal
                title={event.title}
                description={event.description}
                hostname={event.hostName}
                visable={isModalVisible}
                toggleModal={toggleModal}
              /><Callout
                style={styles.plainView}
                onPress={openEventModal}
              >
                <View>
                  <Text style={{fontWeight:'bold'}}>{event.title}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

      </View>

      <View style={styles.container}>
        <Text style={styles.textStyle}>username420</Text>
        <View style={styles.row}>
          <Button
            title="User Profile"
            onPress={() => { props.navigation.navigate('UserProfile') }}
          />
          <Button
            title="Create Event"
            onPress={() => { props.navigation.navigate('CreateEvent') }}
          />
          <Button
            title="Saved Events"
            onPress={() => { props.navigation.navigate('CreateEvent') }}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c54',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  mapStyle: {
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 22,
    color: '#dfe6e9',
  },
  titleStyle: {
    textAlign: 'left',
    fontSize: 25,
    color: '#fff',
    paddingTop: 60,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2
  },
  row: {
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: 'flex-start',
  },
  topBarStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dropdownStyle: {
    width: 100
  },
  plainView: {
    flex: 1,
    width: 'auto'
  },
});

const generatedMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebdfdc"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#aac1f5"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#352c52"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

export default MapScreen;