import React from 'react';
import {Button} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapScreen from '../screens/events/MapScreen';
import CreateEventScreen from '../screens/user/CreateEventScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import ManageEventScreen from '../screens/user/ManageEventScreen';
import AuthScreen from '../screens/user/AuthScreen';

const EventNavigator = createStackNavigator(
    {
        Home: {
            screen: MapScreen, 
            navigationOptions: {
                headerShown: false,
            },
        },
        CreateEvent: {
            screen: CreateEventScreen,
            navigationOptions: {
                title: "Create Event",
                /*headerRight: () => (
                    <Button
                      onPress={() => alert('This is a button!')}
                      title="Submit"
                    />
                  ),*/
            }
        },
        UserProfile: UserProfileScreen,
        ManageEvent: ManageEventScreen,
        Auth: AuthScreen
    }
);

export default createAppContainer(EventNavigator);