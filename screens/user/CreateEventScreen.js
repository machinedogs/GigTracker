import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MapScreen = props => {
  return (
    <View style={styles.container}>
      <Text>This is the create event screen</Text>
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