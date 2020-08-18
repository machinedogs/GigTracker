import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { UserNavigator, GuestNavigator } from './GigTrackerNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => state.user.accessToken);
  const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth.length > 0 && didTryAutoLogin === true && <UserNavigator />}
      {isAuth.length < 1 && didTryAutoLogin === true && <GuestNavigator />}
      {isAuth.length < 1 && didTryAutoLogin === false && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
