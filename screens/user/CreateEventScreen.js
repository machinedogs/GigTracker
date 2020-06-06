import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    setShow(Platform.OS === 'ios');
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
      //post request
    } else {
      //alert that event is not valid
    }
  }


  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={saveEvent}
        >
          <Text style={{ textAlign: 'right', fontSize: 22, color: 'gray' }}>                                               Save Event</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button onPress={showDateMode} title="Select date..." />
      </View>
      <View>
        <Button onPress={showTimeMode} title="Select time..." />
      </View>
      {showDate && (
        <DateTimePicker
          value={date}
          mode={'date'}
          onChange={onChangeDate}
          isVis
        />
      )}
      {showTime && (
        <DateTimePicker
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
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