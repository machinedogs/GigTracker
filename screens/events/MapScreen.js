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
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { Icon } from 'react-native-elements';
import { EventCard } from "../../components/EventCard";
import { EVENTS } from '../../data/dummy-data';
import MapStyle from '../../constants/MapStyle';
import EventModal from '../../components/EventModal';
import Event from '../../models/event';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import { CustomCallout } from '../../components/CustomCallout';

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

const MapScreen = props => {
  const userAccessToken = useSelector(state => state.user.accessToken);
  const [events, setEvents] = useState(EVENTS);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(new Event)
  let mapRef = useRef(null);
  let menuRef = useRef(null);
  const [date, setDate] = useState(todaysDate());
 
  var calloutID = 10;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  //  get initial location then animate to that location
  // only do this on mount and unmount of map component 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .009, longitudeDelta: .009 };
        console.log(coords);
        mapRef.current.animateToRegion(coords, 0);
      }, (error) => console.log(error));
  }, []);
  
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
  // console.log(categories);

  const filterCategory = (category) => {
    if (category === 'All events') {
      setEvents(EVENTS)
    } else {
      setEvents(EVENTS.filter(event => event.category === category))
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
  }


  const filterDate = (selectedDate) => {
    setDate(selectedDate);
    setEvents(EVENTS.filter(event => event.date === selectedDate))
    console.log(selectedDate)
  }

  return (
    //add a dropdown to choose map style? -> what if we put it in user settings? could incentivize people to become users
    //add dropdown calendar
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.darkGrey} barStyle='light-content' />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
        showsTraffic={false}
        toolbarEnabled={true}
        ref={mapRef}
        customMapStyle={MapStyle /* theme.dark ? darkMapStyle : lightMapStyle */}
      >
        {events.map(event => (
          <Marker
            coordinate={{ latitude: event.latitude, longitude: event.longitude }}
            title={event.title}
            pinColor="#341f97"
            icon={FlashOnIcon}
            description={event.description}
            key={event.id}
            onPress={onPinPress.bind(this, event)}
          ><Callout
            style={styles.plainView}
            onPress={onEventCalloutPress}
            tooltip={true}
            key={event.id}
          >
                {Platform.OS === 'ios' ? (<EventCard event={event} />) : (
                  <CustomCallout style ={{height:400}} event={event} />
                )}
            </Callout>
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
      {!userAccessToken ?
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
                onPress={() => { props.navigation.navigate('Profile') }}
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
                name='bookmark'
                type='font-awesome'
                color={Colors.darkGrey}
                size={28}
                onPress={() => { props.navigation.navigate('CreateEvent') }}
              />
            </TouchableOpacity>
          </SafeAreaView>
        )
      }
    </View>
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
    paddingTop: 0,

    //width: Dimensions.get('window').width,
  },
  top: {
    backgroundColor: '#130f40',
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    width: Dimensions.get('window').width,
  }
  ,
  map: {
    flex: 1,
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    flex: 2,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#130f40'
  },
  dropdownStyle: {
    width: 100
  },
  plainView: {
    flex: 1,
    width: 'auto',


  },
});



export default MapScreen;
