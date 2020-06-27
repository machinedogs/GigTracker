import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Icon } from 'react-native-elements';
import { EventCard } from "../../components/EventCard";
import MapStyle from '../../constants/MapStyle';
import EventModal from '../../components/EventModal';
import Event from '../../models/event';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import { GetHostedEvents } from '../../store/actions/events';
import { GetSavedEvents } from '../../store/actions/events';
import * as eventActions from '../../store/actions/events';
import { CustomCallout } from '../../components/CustomCallout';
import * as iconHelpers from '../helper/iconHelpers';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


const todaysDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return mm + '/' + dd + '/' + yyyy;
}

const INITIAL_REGION = {
  latitude: 39.9,
  longitude: -75.1,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const MapScreen = props => {

  const userAccessToken = useSelector(state => state.user.accessToken);
  const events = useSelector(state => state.events.events);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEventButtonsVisible, setEventButtonsVisible] = useState(false);
  const [isCalloutVisible, setCalloutVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(new Event)
  let mapRef = useRef(null);
  const [date, setDate] = useState(todaysDate());
  //Redux
  const dispatch = useDispatch();
  var user = useSelector((state) => state.user);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const getHostedEvents = async (user) => {

    console.log('Dispatching get hosted events action from mapscreen')
    console.log(user.accessToken)
    dispatch(GetHostedEvents(user))
  }
  const getSavedEvents = async (user) => {

    console.log('Dispatching get saved events action from mapscreen')
    console.log(user.accessToken)
    dispatch(GetSavedEvents(user))
  }


  //  get initial location then animate to that location
  // only do this on mount and unmount of map component 
  useEffect(() => {
    //TODO: Improve service call placements
    getHostedEvents(user);
    getSavedEvents(user);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };
        console.log("Got the coords: " + coords);
        mapRef.current.animateToRegion(coords, 0);
      }, (error) => console.log(error));
  }, []);

  const refreshEvents = () => {
    console.log("Refreshing events")
    dispatch(eventActions.getEvents());
  }

  const filterCategory = (category) => {
    if (category === 'All events') {
      //setEvents(theEvents)
    } else {
      //setEvents(theEvents.filter(event => event.category === category))
    }
  };

  // gets called when callout is pressed i.e. pin must be pressed first
  const onEventCalloutPress = () => {
    console.log("pressing event callout");
    console.log(selectedEvent)
    toggleModal();
  }

  const onPinPress = (event) => {
    setSelectedEvent({ id: event.id, title: event.title, description: event.description, hostName: event.hostName });
    console.log("pressing pin");
    console.log(event)

    //let coords = { latitude: parseFloat(event.location.latitude), longitude: parseFloat(event.location.longitude), latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA };
    //mapRef.current.animateToRegion(coords, 0);
  }
  /*
  const filterDate = (selectedDate) => {
    setDate(selectedDate);
    //setEvents(events.filter(event => event.date === selectedDate))
    console.log(selectedDate + '\n' + events.map((event) => {event.toString()}))
  }
  */

  return (
    //add a dropdown to choose map style? -> what if we put it in user settings? could incentivize people to become users
    //add dropdown calendar
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.darkGrey} barStyle='light-content' />
      <MapView
        initialRegion={INITIAL_REGION}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
        showsTraffic={false}
        toolbarEnabled={true}
        ref={mapRef}
        customMapStyle={MapStyle /* theme.dark ? darkMapStyle : lightMapStyle */}
        clusterColor="#341f97"
      >
        {events.map(event => (
          <Marker
            coordinate={{ latitude: parseFloat(event.location.latitude), longitude: parseFloat(event.location.longitude) }}
            title={event.title}
            pinColor="#341f97"
            description={event.description}
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
                    <CalloutSubview onPress={onEventCalloutPress}>
                      <EventCard event={event} style={{ width: SCREEN_WIDTH * 0.75 }} streetAddress />
                    </CalloutSubview>
                    <View style={{ flexDirection: 'row' }}>
                      <CalloutSubview onPress={() => { props.navigation.navigate('Auth') }}>
                        <TouchableOpacity>
                          <Icon
                            reverse
                            raised
                            name='save'
                            type='font-awesome'
                            color={Colors.darkGrey}
                            size={20}
                            reverseColor='white'
                          />
                        </TouchableOpacity>
                      </CalloutSubview>
                      <CalloutSubview onPress={() => { props.navigation.navigate('Auth') }}>
                        <TouchableOpacity>
                          <Icon
                            reverse
                            raised
                            name='share-alt'
                            type='font-awesome'
                            color={Colors.darkGrey}
                            size={20}
                            reverseColor='white'
                          />
                        </TouchableOpacity>
                      </CalloutSubview>
                    </View>
                  </View>
                </Callout>
              ) :
              ( // Android
                <Callout
                  style={styles.plainView}
                  onPress={onEventCalloutPress}
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

      <EventModal
        title={selectedEvent.title}
        description={selectedEvent.description}
        hostName={selectedEvent.hostName}
        visible={isModalVisible}
        toggleModal={toggleModal}
      />
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
              <TouchableOpacity title = 'user'>
                <Icon
                  reverse
                  raised
                  name='user'
                  type='font-awesome'
                  color={Colors.darkGrey}
                  size={28}
                  reverseColor='white'
                  onPress={() => { props.navigation.navigate('Auth') }}
                />
              </TouchableOpacity>
            </SafeAreaView>
          ) :
          (
            <SafeAreaView style={styles.row}>
              <TouchableOpacity>
                <Icon
                  reverse
                  raised
                  name='user'
                  type='font-awesome'
                  color={Colors.darkGrey}
                  size={28}
                  onPress={() => { props.navigation.navigate('UserProfile') }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  reverse
                  raised
                  name='plus'
                  type='font-awesome'
                  color={Colors.darkGrey}
                  size={28}
                  onPress={() => { props.navigation.navigate('CreateEvent') }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  reverse
                  raised
                  name='refresh'
                  type='font-awesome'
                  color={Colors.darkGrey}
                  size={28}
                  reverseColor='white'
                  onPress={refreshEvents}
                />
              </TouchableOpacity>
            </SafeAreaView>

          )
      }
    </View >
  );
}

MapScreen.navigationOptions = navData => {
  return {
    headerLeft: () =>
      (
        <HeaderButtons HeaderButtonComponent={HeaderButton} >
          <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-options' : 'ios-options'}
            onPress={() => { }}
          />
        </HeaderButtons>
      ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
          onPress={() => { }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 0,
    //width: Dimensions.get('window').width,
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
    paddingBottom: 19,
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
});



export default MapScreen;