import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const MapScreen = props => {
  return (
    <View style={styles.container}>
      <Text>This is the map screen</Text>
      <Button
        title="Create Event"
        onPress={() => {props.navigation.navigate('CreateEvent')}}
      />
      <Button
        title="User Profile"
        onPress={() => {props.navigation.navigate('UserProfile')}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;