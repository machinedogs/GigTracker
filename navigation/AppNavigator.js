import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { UserNavigator, GuestNavigator } from './GigTrackerNavigator';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';

const LightTheme = {
  ...DefaultTheme,
  colors = {
    ...DefaultTheme.colors,
    primary: Colors.purpleButton,
    background: Colors.darkGrey
  }
}

const AppNavigator = props => {
  const isAuth = useSelector(state => state.user.accessToken);
  const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

  return (
    <NavigationContainer theme={LightTheme}>
      {isAuth.length > 0 && didTryAutoLogin === true && <UserNavigator />}
      {isAuth.length < 1 && didTryAutoLogin === true && <GuestNavigator />}
      {isAuth.length < 1 && didTryAutoLogin === false && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
