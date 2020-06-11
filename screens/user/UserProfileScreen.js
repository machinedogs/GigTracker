import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/user';

const UserProfileScreen = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>This is the user profile screen</Text>
      <Button title='Logout' onPress={() => {
        dispatch(authActions.logout());
        props.navigation.navigate('Home');
      }}
      />
      <Button title='Delete Account' onPress={() => {
        // Take user to delete account screen and let them delete
        props.navigation.navigate('Delete');
      }}
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

export default UserProfileScreen;