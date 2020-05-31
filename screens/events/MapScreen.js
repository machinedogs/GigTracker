import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions, Image, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from 'react-native-datepicker';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
//import { useTheme } from 'react-navigation/native';

import { EVENTS } from '../../data/dummy-data';
import MapStyle from '../../constants/MapStyle';
import EventModal from '../../components/EventModal'


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
  const [events, setEvents] = useState(EVENTS);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({ id: "", title: "", description: "", hostName: "" })

  const [date, setDate] = useState(todaysDate());

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
  // console.log(categories);

  const filterCategory = (category) => {
    if (category === 'All events') {
      setEvents(EVENTS)
    } else {
      setEvents(EVENTS.filter(event => event.category === category))
    }
  };

  // gets called when callout is pressed i.e. pin must be pressed first
  const onEventCalloutPress = (event) => {
    console.log("pressing event callout");
    toggleModal();

  }

  const onPinPress = (event) => {
    setSelectedEvent({ id: event.id, title: event.title, description: event.description });
    console.log("pressing event callout");
    console.log(event)

  }

  const filterDate = (selectedDate) => {
    setDate(selectedDate);
    setEvents(EVENTS.filter(event => event.date === selectedDate))
    console.log(selectedDate)
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
          <View>
            <Text style={{ color: 'white', fontSize: 12, paddingTop: 13, paddingLeft: 35 }}>Select a date</Text>
            <DatePicker
              style={{ width: 100 }}
              date={date}
              mode="date"
              placeholder="select date"
              format="MM-DD-YYYY"
              minDate="05-01-2020" // We should insert the current date here
              maxDate="06-01-2021" // Max date is 1 year out from current date?
              showIcon={false}
              style={styles.textStyle}
              customStyles={{ textColor: 'white' }}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={filterDate}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 4 }}>

        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          rotateEnabled={false}
          showsTraffic={false}
          customMapStyle={MapStyle /* theme.dark ? darkMapStyle : lightMapStyle */}
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
              onPress={onPinPress.bind(this, event)}
            ><Callout
              style={styles.plainView}
              onPress={onEventCalloutPress}
            >
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <EventModal
          title={selectedEvent.title}
          description={selectedEvent.description}
          hostname={selectedEvent.hostName}
          visible={isModalVisible}
          toggleModal={toggleModal}
        />
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
    backgroundColor: '#130f40',
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
    color: 'white',

  },
  titleStyle: {
    textAlign: 'left',
    fontSize: 25,
    color: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
    paddingBottom: 10,
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



export default MapScreen;