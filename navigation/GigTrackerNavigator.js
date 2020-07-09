import React from 'react';
import { Platform, Dimensions } from 'react-native';
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
import SettingsScreen from '../screens/user/SettingsScreen';

const WIDTH = Dimensions.get('window').width;


const EventNavigator = createStackNavigator(
    {
        Startup: {
            screen: StartupScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Home: {
            screen: MapScreen,
            navigationOptions: {
                headerTitle: Platform.OS === 'ios' ? '  Current' : 'Current   ',
                headerTitleStyle: {
                    fontFamily: 'jack-silver',
                    fontSize: 32,
                    textAlign: 'center',
                    width: WIDTH * 0.75,
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
                title: "create event",
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height
                },
                headerTitleStyle: {
                    fontSize: 30,
                    fontFamily: 'jack-silver',
                    color: '#fff',
                    textAlign: Platform.OS === 'ios' ? 'center' : 'auto',
                    width: WIDTH - 75,
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
                    fontSize: 30,
                    fontFamily: 'jack-silver',
                    color: '#fff',
                    textAlign: Platform.OS === 'ios' ? 'center' : 'auto',
                    width: WIDTH - 75,
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
                    height: Platform.OS === 'ios' ? 110 : Header.height,
                },
                headerTitle: "event details",
                headerTitleStyle: {
                    fontSize: 30,
                    fontFamily: 'jack-silver',
                    textAlign: Platform.OS === 'ios' ? 'center' : 'auto',
                    width: WIDTH - 75,
                },
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTitleAllowFontScaling: true
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                headerTitle: "Settings",
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height,
                },
                headerTitleStyle: {
                    fontSize: 30,
                    fontFamily: 'jack-silver',
                    textAlign: Platform.OS === 'ios' ? 'center' : 'auto',
                    width: WIDTH - 75,
                },
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTitleAllowFontScaling: true
            }
        },
        Auth: {
            screen: AuthScreen,
            navigationOptions: {
                headerTitle: "Account",
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height,
                },
                headerTitleStyle: {
                    fontSize: 30,
                    fontFamily: 'jack-silver',
                    textAlign: Platform.OS === 'ios' ? 'center' : 'auto',
                    width: WIDTH - 75,
                },
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTitleAllowFontScaling: true
            }
        },
        Delete: {
            screen: DeleteScreen,
            navigationOptions: {
                title: 'Delete Account',
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height
                },
                headerTitleStyle: {
                    fontSize: 30,
                    fontFamily: 'jack-silver',
                    color: '#fff',
                    textAlign: Platform.OS === 'ios' ? 'center' : 'auto',
                    width: WIDTH - 75,
                },
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
            },
        }
    }
);

export default createAppContainer(EventNavigator);