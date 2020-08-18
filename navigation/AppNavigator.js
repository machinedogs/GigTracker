import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  { GigTrackerNavigator } from './GigTrackerNavigator';

const AppNavigator = props => {  
    return (
      <NavigationContainer>
        <GigTrackerNavigator />
      </NavigationContainer>
    );
  };
  
  export default AppNavigator;
  