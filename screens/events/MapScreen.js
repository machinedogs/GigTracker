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
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Picker,
  Form,
  Content,
  Icon as VectorIcon,
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Icon } from 'react-native-elements';
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import CalendarPicker from 'react-native-calendar-picker';

import { EventCard } from "../../components/EventCard";
import MapStyle from '../../constants/MapStyle';
import Event from '../../models/event';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import { GetHostedEvents } from '../../store/actions/events';
import { GetSavedEvents } from '../../store/actions/events';
import * as eventActions from '../../store/actions/events';
import { CustomCallout } from '../../components/CustomCallout';
import * as iconHelpers from '../helper/iconHelpers';
import { getGeoInfo } from '../../screens/helper/geoHelper';

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userName = useSelector(state => state.user.userName);
  const userAccessToken = useSelector(state => state.user.accessToken);
  const savedEvents = useSelector(state => state.events.savedEvents);
  const [isEventSaved, setEventSaved] = useState(false);
  const events = useSelector(state => state.events.events);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(new Event);
  const [category, setCategory] = useState("0");
  let mapRef = useRef(null);
  const [date, setDate] = useState(todaysDate());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

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
        console.log("Got the coords in map screen: " + coords);
        mapRef.current.animateToRegion(coords, 0);
      }, (error) => console.log(error));
  }, []);

  const refreshEvents = async () => {
    console.log("Refreshing events")
    let coordinates = '';
    await getGeoInfo().then(coords => coordinates = coords);
    var currentDate = new Date().toISOString();
    setIsRefreshing(true);
    await dispatch(eventActions.getEvents(currentDate, coordinates.latitude, coordinates.longitude));
    setIsRefreshing(false);
    //dispatch(eventActions.getEvents()); pull global events here, no 
  }

  const filterCategory = (category) => {
    if (category === 'All events') {
      //setEvents(theEvents)
    } else {
      //setEvents(theEvents.filter(event => event.category === category))
    }
  };

  // gets called when callout is pressed i.e. pin must be pressed first
  const onEventCalloutPress = (event) => {
    console.log("pressing event callout");
    console.log(selectedEvent);
    //toggleModal();
    props.navigation.navigate('EventScreen', { event: event });
  }

  const onPinPress = (event) => {
    setSelectedEvent(event);
    console.log("pressing pin");
    console.log(event)
    // Determine if selected event has already been saved
    var existingIndex = savedEvents.findIndex(myEvent => myEvent.event === event.event)
    if (existingIndex >= 0) { // check if index exists
      setEventSaved(true);
    } else {
      setEventSaved(false);
    }
    console.log("Selected Event Save status: " + isEventSaved);
    /*
    let coords = {
      latitude: parseFloat(event.location.latitude), // mapRef.current.region.latitude + ((parseFloat(event.location.latitude)) - (mapRef.current.region.latitude - (mapRef.current.region.latitudeDelta / 4))), //parseFloat(event.location.latitude) + 0.035,
      longitude: parseFloat(event.location.longitude),
      latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
    };
    mapRef.current.animateToRegion(coords, 0);
    */
  }

  const filterDate = (selectedDate) => {
    setDate(selectedDate);
    //setEvents(events.filter(event => event.date === selectedDate))
    console.log(selectedDate + '\n' + events.map((event) => { event.toString() }))
  }

  const toggleSaveButton = () => {
    // dispatch action
    if (!isEventSaved) {
      dispatch(eventActions.saveEvent(selectedEvent))
      Alert.alert("Event Saved")
    } else { // indicating user unsaved the event
      dispatch(eventActions.unsaveEvent(selectedEvent))
      Alert.alert("Event No Longer Saved")
    }
    setEventSaved(!isEventSaved);
    console.log(isEventSaved);
  };

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  }

  return (
    //add a dropdown to choose map style? -> what if we put it in user settings? could incentivize people to become users
    //add dropdown calendar
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.darkGrey} barStyle='light-content' />
      <View style={{
        flexDirection: 'row', backgroundColor: Colors.darkGrey,
        height: 55, color: '#fff', alignItems: 'center', alignContent: 'space-evenly', justifyContent: 'space-between',
      }}>
        {Platform.OS === "ios" ? (
          <DropDownPicker
            multiple={true} min={0} max={15} multipleText="%d categories selected"
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
            //defaultValue={category}
            placeholder="Category"
            containerStyle={{
              height: 50,
              width: SCREEN_WIDTH * 0.4,
              justifyContent: "center",
              alignItems: "center",
              color: '#fff'
            }}
            style={{ borderColor: Colors.purpleBackground, borderWidth: 0.5, color: '#fff', backgroundColor: Colors.darkGrey }}
            dropdownStyle={{ borderColor: Colors.purpleBackground, height: 300, color: '#fff', backgroundColor: Colors.lightBackground }}
            itemStyle={{ alignItems: "center", color: '#fff' }}
            onChangeItem={(category) => filterCategory(category.value)}
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
              style={{ borderColor: "gray", borderWidth: 0.5 }}
              onValueChange={(value) => setCategory(value)}
            />
          )}
          <Text></Text>
          <Text></Text>
          <Text></Text>
        <Button iconRight transparent
          style={{ width: 150, }}
          onPress={toggleShowCalendar}
        >
          <Text style={styles.text}>Date</Text>
          <VectorIcon name="calendar" color='#fff' />
        </Button>
      </View>
      {showCalendar && (
          <View style={styles.calendar}>
            <CalendarPicker
              onDateChange={filterDate}
              textStyle={{color: '#fff'}}
            />

            <View>
              <Text>SELECTED DATE:</Text>
            </View>
          </View>
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
        ref={mapRef}
        customMapStyle={MapStyle /* theme.dark ? darkMapStyle : lightMapStyle */}
        clusterColor="#341f97"
      >
        {events.map(event => (
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

                    {/*<View style={{ flexDirection: 'row' }}>
                      {(userName != event.host.name && userName) ?
                        (<CalloutSubview onPress={toggleSaveButton}>
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
                        </CalloutSubview>) : null
                      }
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
                    </View>*/}
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
              <TouchableOpacity>
                <Icon
                  reverse
                  raised
                  name='user'
                  type='font-awesome'
                  color={Colors.darkGrey}
                  size={28}
                  reverseColor={Colors.lightText}
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
                  reverseColor={Colors.lightText}
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
                  reverseColor={Colors.lightText}
                  onPress={() => { props.navigation.navigate('CreateEvent') }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                {isRefreshing ? // if refreshing events, show activity indicator
                  (
                    <Icon
                      reverse
                      raised
                      name='spinner'
                      type='font-awesome'
                      color={Colors.darkGrey}
                      size={28}
                      reverseColor={Colors.lightText}
                    />
                  ) :
                  (
                    <Icon
                      reverse
                      raised
                      name='refresh'
                      type='font-awesome'
                      color={Colors.darkGrey}
                      size={28}
                      reverseColor={Colors.lightText}
                      onPress={refreshEvents}
                    />
                  )
                }
              </TouchableOpacity>
            </SafeAreaView>

          )
      }
    </View >
  );
}

/*
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
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: Colors.darkGrey
    //width: Dimensions.get('window').width,
  },
  calendar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.darkGrey,  
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
});



export default MapScreen;