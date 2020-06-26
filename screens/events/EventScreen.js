import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const EventScreen = props => {
    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <Text>Description</Text>
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
  
  export default EventScreen;