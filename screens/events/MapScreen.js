import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { EVENTS } from '../../data/dummy-data';

const MapScreen = props => {
  return (
    <View style={styles.container}>
      <Text>This is the map screen</Text>
      <Button
        title="Create Event"
        onPress={() => { props.navigation.navigate('CreateEvent') }}
      />
      <Button
        title="User Profile"
        onPress={() => { props.navigation.navigate('UserProfile') }}
      />
      <FlatList
        style={{ marginHorizontal: 30 }}
        keyExtractor={item => item.id}
        data={EVENTS}
        renderItem={itemData =>
          <Text style={{marginVertical: 10}} >
            {itemData.item.title} hosted by {itemData.item.hostName}
          </Text>
        }
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