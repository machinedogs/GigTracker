import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  Icon as VectorIcon,
  Left,
  Right,
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import CalendarPicker from 'react-native-calendar-picker';

import { EventCard } from "../../components/EventCard";
import MapStyle from '../../constants/MapStyle';
import Event from '../../models/event';
import Colors from '../../constants/Colors';
import * as eventActions from '../../store/actions/events';
import { CustomCallout } from '../../components/CustomCallout';
import * as iconHelpers from '../helper/iconHelpers';
import { getGeoInfo } from '../../screens/helper/geoHelper';
import CategorySelector from '../../components/CategorySelector';

const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const INITIAL_REGION = {
  latitude: 39.9,
  longitude: -75.1,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const MapScreen = props => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userAccessToken = useSelector(state => state.user.accessToken);
  const savedEvents = useSelector(state => state.events.savedEvents);
  const [isEventSaved, setEventSaved] = useState(false);
  const filteredEvents = useSelector(state => state.events.filteredEvents);
  const [selectedEvent, setSelectedEvent] = useState(new Event);
  const [selectedDate, setSelectedDate] = useState(new Date().setHours(0,0,0,0));
  const [showCategories, setShowCategories] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  let mapRef = useRef(null);
  let clusterRef = useRef(null);
  const dispatch = useDispatch();

  //  get initial location then animate to that location
  // only do this on mount and unmount of map component 
  useEffect(() => {
    dispatch(eventActions.updatePeopleAttending(null))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };
        console.log("Got the coords in map screen: " + coords);
        mapRef.current.animateToRegion(coords, 0);
      }, (error) => console.log(error));
  }, []);

  const refreshEvents = async () => {
    console.log("Refreshing events")
    let coordinates = '';
    await getGeoInfo().then(coords => coordinates = coords);
    setIsRefreshing(true);
    const formattedDate = new Date(selectedDate)
    await dispatch(eventActions.getEvents(formattedDate.toISOString(), coordinates.latitude, coordinates.longitude));
    dispatch(eventActions.getEvents(formattedDate.toISOString()));
    setIsRefreshing(false);
  }

  // gets called when callout is pressed i.e. pin must be pressed first
  const onEventCalloutPress = (event) => {
    props.navigation.navigate('EventScreen', { event: event });
  }

  const onPinPress = (event) => {
    setSelectedEvent(event);
    // Determine if selected event has already been saved
    var existingIndex = savedEvents.findIndex(myEvent => myEvent.event === event.event)
    if (existingIndex >= 0) { // check if index exists
      setEventSaved(true);
    } else {
      setEventSaved(false);
    }

    let coords = {
      latitude: parseFloat(event.location.latitude) + mapRef.current.__lastRegion.latitudeDelta * 0.35,
      longitude: parseFloat(event.location.longitude),
      latitudeDelta: mapRef.current.__lastRegion.latitudeDelta,
      longitudeDelta: mapRef.current.__lastRegion.longitudeDelta
    };
    mapRef.current.animateToRegion(coords, 0);
  }

  const filterDate = async (givenDate) => {
    let coordinates = '';
    await getGeoInfo().then(coords => coordinates = coords);
    const dateToSet = new Date(givenDate)
    dateToSet.setHours(0, 0, 0, 0);
    console.log("User selected date: " + givenDate)
    setSelectedDate(dateToSet);
    setIsRefreshing(true);
    await dispatch(eventActions.getEvents(dateToSet.toISOString(), coordinates.latitude, coordinates.longitude));
    dispatch(eventActions.getEvents(dateToSet.toISOString()));
    setIsRefreshing(false);
  }

  const toggleShowCalendar = () => {
    if (showCategories) {
      setShowCategories(false);
    }
    setShowCalendar(!showCalendar);
  }

  const toggleShowCategories = () => {
    if (showCalendar) {
      setShowCalendar(false);
    }
    setShowCategories(!showCategories);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.darkGrey} barStyle='light-content' />
      <SafeAreaView style={styles.header}>
        <Left>
          <VectorIcon
            type="Feather"
            name="filter"
            color='#fff'
            style={{ color: 'white', paddingLeft: 20 }}
            onPress={toggleShowCategories}
          />
        </Left>
        <Text style={{
          fontFamily: 'jack-silver',
          fontSize: 32,
          textAlign: 'center',
          color: 'white', width: SCREEN_HEIGHT * .25
        }}
        >
          Current
        </Text>
        <Right>
          <VectorIcon
            name="calendar"
            color='#fff'
            style={{ color: 'white', paddingRight: 20 }}
            onPress={toggleShowCalendar}
          />
        </Right>
      </SafeAreaView>
      {showCalendar && (
        <View style={{ backgroundColor: 'white', paddingVertical: 5 }}>
          <CalendarPicker
            minDate={new Date()}
            onDateChange={filterDate}
            selectedDayColor={Colors.lightPurple}
            previousTitle='Prev'
          />
        </View>
      )}
      {showCategories && (
        <CategorySelector
          style={{
            width: SCREEN_WIDTH,
            backgroundColor: 'white',
            maxHeight: 225
          }}
        />
      )}
      <MapView
        initialRegion={INITIAL_REGION}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
        showsTraffic={false}
        toolbarEnabled={true}
        superClusterRef={clusterRef}
        ref={mapRef}
        customMapStyle={MapStyle /* theme.dark ? darkMapStyle : lightMapStyle */}
        clusterColor="#341f97"
        onPress={() => {
          setShowCalendar(false);
          setShowCategories(false);
        }}
        edgePadding={{ top: 100, left: 50, bottom: 150, right: 50 }}
      >
        {filteredEvents.map(event => (
          <Marker
            coordinate={{ latitude: parseFloat(event.location.latitude), longitude: parseFloat(event.location.longitude) }}
            pinColor="#341f97"
            key={event.event}
            tracksViewChanges={false}
            onPress={onPinPress.bind(this, event)}
            icon={iconHelpers.iconPicker(event.category)}
          >
            {Platform.OS === 'ios' ?
              (
                <Callout
                  style={styles.plainView}
                  tooltip={true}
                  key={event.id}
                >
                  <View>
                    <CalloutSubview onPress={onEventCalloutPress.bind(this, event)}>
                      <EventCard event={event} style={{ width: SCREEN_WIDTH * 0.75 }} streetAddress />
                    </CalloutSubview>
                  </View>
                </Callout>
              ) :
              ( // Android
                <Callout
                  style={styles.plainView}
                  onPress={onEventCalloutPress.bind(this, event)}
                  tooltip={true}
                  key={event.id}
                >
                  <CustomCallout
                    style={{ width: SCREEN_WIDTH * 0.75 }}
                    event={event}
                  />
                </Callout>
              )
            }
          </Marker>
        ))
        }
      </MapView>
      {
        !userAccessToken ?
          (
            <SafeAreaView
              style={{
                position: 'absolute',//use absolute position to show button on top of the map
                bottom: '0.5%',
                alignSelf: 'center' //for align to right
              }}
            >
              <TouchableOpacity
                style={styles.bottomButtonContainer}
                onPress={() => { props.navigation.navigate('Auth') }}
              >
                <View style={styles.bottomButtonStyle}>
                  <VectorIcon
                    name='ios-person'
                    type='Ionicons'
                    size={28}
                    style={{ color: 'white' }}
                  />
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          ) :
          (
            <SafeAreaView style={styles.row}>
              <TouchableOpacity
                style={styles.bottomButtonContainer}
                onPress={() => { props.navigation.navigate('UserProfile') }}
              >
                <View style={styles.bottomButtonStyle}>
                  <VectorIcon
                    name='ios-person'
                    type='Ionicons'
                    size={28}
                    style={{ color: 'white' }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, paddingBottom: 10 }}
                onPress={() => { props.navigation.navigate('CreateEvent') }}
              >
                <View style={styles.bottomButtonStyle}>
                  <VectorIcon
                    name='add-location'
                    type='MaterialIcons'
                    size={28}
                    style={{ color: 'white' }}
                  />
                </View>
              </TouchableOpacity>

              {isRefreshing ? // if refreshing events, show activity indicator
                (
                  <View style={styles.bottomButtonContainer}>
                    <View style={styles.bottomButtonStyle}>
                      <ActivityIndicator color='white' />
                    </View>
                  </View>
                ) :
                (
                  <TouchableOpacity
                    style={styles.bottomButtonContainer}
                    onPress={refreshEvents}
                  >
                    <View style={styles.bottomButtonStyle}>
                      <VectorIcon
                        name='reload1'
                        type='AntDesign'
                        size={28}
                        style={{ color: 'white' }}
                      />
                    </View>
                  </TouchableOpacity>
                )
              }
            </SafeAreaView>
          )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 0,
    paddingBottom: 0,
    //width: Dimensions.get('window').width,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 110 : '9%',
    backgroundColor: Colors.darkGrey
  },
  top: {
    backgroundColor: '#2d3436',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    //justifyContent: 'center',
  }
  ,
  map: {
    flex: 1,
    zIndex: -1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT //* .86,
  },
  titleStyle: {
    textAlign: 'left',
    fontSize: 25,
    color: '#fff',
    paddingTop: 5,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',//use absolute position to show button on top of the map
    bottom: 0,
    alignSelf: 'center' //for align to right
  },
  topBarStyle: {
    width: SCREEN_WIDTH,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#2d3436'
  },
  dropdownStyle: {
    width: 100
  },
  plainView: {
    flex: 1,
    width: 'auto'

  },
  modalContainer: {
    height: 100,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: Colors.lightBackground
  },
  modal: {

  },
  text: {
    fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
    fontSize: 18,
    color: '#fff',
  },
  bottomButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomButtonContainer: {
    paddingBottom: 10
  },
});



export default MapScreen;