import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { Icon } from 'react-native-elements';

import { EVENTS } from '../../data/dummy-data';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const MapScreen = props => {

  let categories = [{category: 'All events'}];
  EVENTS.map(event => {
    if(categories.includes(event.category)) {

    }else{
      let category = {
        category: event.category
      }
      categories.push(category)
    }
  });
  console.log(categories);

  const filterCategory = (category) => {
    EVENTS.filter(event => event.category === category)
  }

  props.navigation.setOptions={
    title: 'yooo',
  };

  return (

    //change the header bar color?
    //pass the props to TopBar and BottomBar for navigation?
    //filter by event.category
    <View style={styles.container}>

      <View style={styles.container}>
        <Text style={styles.textStyle}>GigTracker</Text>
        <View style={styles.topBarStyle}>
          <Dropdown
            label="Category"
            data={categories}
            containerStyle={styles.dropdownStyle}
            baseColor='#fff'
            itemTextStyle={styles.containerStyle}
            onChangeText={filterCategory}
          />
          <Dropdown
            label="Date"
            data={categories}
            containerStyle={styles.dropdownStyle}
            baseColor='#fff'
            itemTextStyle={styles.containerStyle}
          />
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          //followsUserLocation={true}
          rotateEnabled={false}
          //customMapStyle={generatedMapStyle}
        >
          {EVENTS.map(event => (
            <Marker
              coordinate={{ latitude: event.latitude, longitude: event.longitude }}
              title={event.title}
              pinColor="blue"
              icon={FlashOnIcon}
              description={event.description}
              key={event.id}
              onPress={() => { }}
              tracksViewChanges={false}
            />
          ))}
        </MapView>
      </View>

      <View style={styles.container}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/2.jpg' }} style={styles.img} />
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
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 25,
    color: 'white',
    paddingTop: 15,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2
  },
  row: {
    flex: 1,
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
  },
  dropdownStyle: {
    width: 100
  },
  containerStyle: {
    color: 'blue',
  }
});

const generatedMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

export default MapScreen;