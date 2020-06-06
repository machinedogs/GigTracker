import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Platform, ScrollView, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Event from '../../models/event';

const MapScreen = event => {

  let initTitle = event.title ? event.title : '';
  let initDescription = event.description ? event.description : '';
  let initLocation = event.latitude ? { latitude: event.latitude, longitude: event.longitude } : '';
  let initCategory = event.category ? event.category : '';

  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  //SET TIME
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [category, setCategory] = useState(initCategory);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = () => { };

  const showDateMode = () => {
    setShowDate(true);
  };

  const showTimeMode = () => {
    setShowTime(true);
  };

  const saveEvent = () => {
    if (title && description && location && date && category) {
      const newEvent = new Event(1000, date, 'USER', title, description, category, 'latitude', longitude)
      //Dispatch action (CREATE_EVENT, event)
    } else {
      //alert that event is not valid
      alert('Fill out all event info before submitting.')
    }
  }

  const dateTitle = () => {
    return (
      showDate ? date.toString() : 'Select date...'
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', flex: 1 }}>
        </View>
        <TextInput
          style={styles.titleStyle}
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder={'Add a title...'}
        />
        <Text>  </Text>
        <TextInput
          style={styles.descriptionStyle}
          onChangeText={text => setDescription(text)}
          value={description}
          placeholder={'Add a description...'}
          multiline
          numberOfLines={5}
        />
        <DropDownPicker
          items={[
            { label: 'Political', value: 'political' },
            { label: 'Music', value: 'music' },
            { label: 'Sports', value: 'sports' },
            { label: 'Meeting', value: 'meeting' },
            { label: 'Party', value: 'party' },
            { label: 'Food', value: 'food' },
          ]}
          defaultValue={initCategory}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: '#fafafa' }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={category => setCategory(category)}
        />
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
        <View style={styles.container}>
          <Button onPress={showDateMode} title={dateTitle()} />
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
          <Button onPress={showTimeMode} title="Select time..." />
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
  }
});

export default MapScreen;