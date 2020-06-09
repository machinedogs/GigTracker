import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Platform, ScrollView, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Mapview, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import MapStyle from '../../constants/MapStyle';
import { useDispatch } from 'react-redux';

import Event from '../../models/event';
import MapView from 'react-native-maps';
import { CREATE_EVENT } from '../../store/actions/events';

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
              latitudeDelta: LATITUDE_DELTA,
              longitude: parseFloat(position.coords.longitude),
              longitudeDelta: LONGITUDE_DELTA
          };
          console.log(region)
          return region;
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

  //  get initial location then animate to that location
  // only do this on mount and unmount of map component 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .009, longitudeDelta: .009 };
        console.log(coords);
        setLocation(coords);
        mapRef.current.animateToRegion(coords, 1000);
      }, (error) => console.log(error));
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
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
      const newEvent = new Event(1000, stringifyDate(date), 'USER', title, description, category.value, location.latitude, location.longitude)
      console.log(newEvent);
      //Dispatch action (CREATE_EVENT, newEvent)
      dispatch({type: CREATE_EVENT, event: newEvent})
    } else {
      //alert that event is not valid
      alert('Fill out all event info before submitting.')
    }
  }

  const dateTitle = () => {
    return (
      date.toString() ? date.toString() : 'Select date...'
    )
  }

  const handleDragEnd = (e) => {
    setLocation({
      latitude: e.latitude,
      longitude: e.longitude
    });
    console.log('location is ' + location)
  }

  const toggleShowMap = () => {
    showMap ? setShowMap(false) : setShowMap(true);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <ScrollView>
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', flex: 1 }}>
        </View>
        <Text>Title</Text>
        <TextInput
          style={styles.titleStyle}
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder={'Add a title...'}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.descriptionStyle}
          onChangeText={text => setDescription(text)}
          value={description}
          placeholder={'Add a description...'}
          multiline
          numberOfLines={5}
        />
        <Text>Category</Text>
        <DropDownPicker
          items={[
            { label: 'Music', value: 'music' },
            { label: 'Political', value: 'political' },
            { label: 'Sports', value: 'sports' },
            { label: 'Meeting', value: 'meeting' },
            { label: 'Party', value: 'party' },
            { label: 'Protest', value: 'protest' },
            { label: 'Food', value: 'food' },
          ]}
          defaultValue={initCategory}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: '#fafafa' }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={category => setCategory(category)}
        />
        <Text>Location</Text>
        <GooglePlacesAutocomplete
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
        />
        <Button onPress={toggleShowMap} title="Drop a pin..." />
          <Modal
            isVisible={showMap}
            onSwipeComplete={toggleShowMap}
            swipeDirection={"down"}
            backdropOpacity={.3}
            onBackdropPress={toggleShowMap}
            swipeThreshold={100}
            TransitionOutTiming={0}
            style={styles.modal}
            borderRadius={10}
            propagateSwipe
          >{curLoc && (
            <MapView
              //initialRegion={ curLoc }
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
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={title}
                description={description}
                //pinColor="#341f97"
                //tracksViewChanges={false}
                draggable
                onDragStart={handleDragEnd}
                onDragEnd={handleDragEnd}
              />
            </MapView>
          )}
          </Modal>
        <View style={styles.container}>
        <Text>Date</Text>
          <Button onPress={toggleShowDate} title={dateTitle()} />
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
        <Text>Time</Text>
          <Button onPress={toggleShowTime} title='Select a time...' />
        </View>
        {showTime && (
          <DateTimePicker
            value={date}
            mode={'time'}
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}
        <TouchableOpacity
          onPress={saveEvent}
        >
          <Text style={{
            textAlign: 'right',
            fontSize: 22,
            color: 'gray',
            paddingRight: 30
          }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width - 10,
    padding: 15
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 22,
    color: 'white',

  },
  dropdownStyle: {
    width: 100
  },
  titleStyle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: 350
  },
  descriptionStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 350,
    height: 120,
  },
  modal: {
    flex: 1,
    marginTop: 300,
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    maxHeight: height*0.5,
    backgroundColor: 'yellow'
  },
  mapStyle: {
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .3,
  },
});

export default MapScreen;