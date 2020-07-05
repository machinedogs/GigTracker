import React from 'react';
import { Button } from 'react-native';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, Header } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import MapScreen from '../screens/events/MapScreen';
import CreateEventScreen from '../screens/user/CreateEventScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import ManageEventScreen from '../screens/user/ManageEventScreen';
import EventScreen from '../screens/events/EventScreen'
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import DeleteScreen from '../screens/user/DeleteScreen';


const EventNavigator = createStackNavigator(
    {
        Startup: StartupScreen,
        Home: {
            screen: MapScreen,
            navigationOptions: {
                headerTitle: 'Conjure',
                headerTitleStyle: {
                    fontFamily: 'jack-silver',
                    fontSize: 32,
                    textAlign: 'center'
                },
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height
                },
                headerTintColor: Colors.lightText,
                gestureEnabled: false, // this stops us from swiping back to startup screen
            },
        },
        CreateEvent: {
            screen: CreateEventScreen,
            navigationOptions: {
                title: "Create Event",
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height
                },
                headerTitleStyle: {
                    fontSize: 28,
                    fontFamily: 'jack-silver',
                    color: '#fff'
                },
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
            }
        },
        UserProfile: {
            screen: UserProfileScreen,
            navigationOptions: {
                title: 'Profile',
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height
                },
                headerTitleStyle: {
                    fontSize: 28,
                    fontFamily: 'jack-silver',
                    color: '#fff'
                },
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
            },
        },
        ManageEvent: ManageEventScreen,
        EventScreen: {
            screen: EventScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height
                },
            }
        },
        Auth: AuthScreen,
        Delete: DeleteScreen
    }
);

export default createAppContainer(EventNavigator);