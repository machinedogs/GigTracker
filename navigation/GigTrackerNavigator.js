import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import MapScreen from '../screens/events/MapScreen';
import CreateEventScreen from '../screens/user/CreateEventScreen';
import UserProfileScreen, { 
    screenOptions as UserProfileScreenOptions
} from '../screens/user/UserProfileScreen';
import ManageEventScreen from '../screens/user/ManageEventScreen';
import EventScreen from '../screens/events/EventScreen'
import StartupScreen from '../screens/StartupScreen';
import DeleteScreen from '../screens/user/DeleteScreen';
import SettingsScreen from '../screens/user/SettingsScreen';
import UserDisplay from '../screens/events/UserDisplay';
import SignupLoginScreen from '../screens/auth/SignupLoginScreen';
import PrivacyStatementScreen from '../screens/auth/PrivacyStatementScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const WIDTH = Dimensions.get('window').width;

const GigTrackerStackNavigator = createStackNavigator();

const defaultNavOptions = {
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

export const GigTrackerNavigator = () => {
    return (
        <GigTrackerStackNavigator.Navigator screensOptions={defaultNavOptions}>
            <GigTrackerStackNavigator.Screen
                name="Startup"
                component={StartupScreen}
                options={{ headerShown: false }}
            />
            <GigTrackerStackNavigator.Screen
                name="Home"
                component={MapScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false, // this stops us from swiping back to startup screen
                }}
            />
            <GigTrackerStackNavigator.Screen
                name="CreateEvent"
                component={CreateEventScreen}
                options={{
                    title: "create event",
                }}
            />
            <GigTrackerStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={UserProfileScreenOptions}
            />
            <GigTrackerStackNavigator.Screen
                name="EventScreen"
                component={EventScreen}
                options={{title: "event details"}}
            />
            <GigTrackerStackNavigator.Screen
                name="GoingListScreen"
                component={UserDisplay}
                options={{title: "People Going"}}
            />
            <GigTrackerStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
                options={{title: "Settings"}}
            />
            <GigTrackerStackNavigator.Screen
                name="SignupLogin"
                component={SignupLoginScreen}
                options={{title: "Account"}}
            />
            <GigTrackerStackNavigator.Screen
                name="PrivacyStatement"
                component={PrivacyStatementScreen}
                options={{title: "Privacy Statement"}}
            />
            <GigTrackerStackNavigator.Screen
                name="Signup"
                component={SignupScreen}
                options={{title: "Sign Up"}}
            />
            <GigTrackerStackNavigator.Screen
                name="Delete"
                component={DeleteScreen}
                options={{title: "Delete Account"}}
            />
        </GigTrackerStackNavigator.Navigator>
    );
};

/*
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
                headerShown: false,
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
        GoingListScreen: {
            screen: UserDisplay,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: Colors.darkGrey,
                    height: Platform.OS === 'ios' ? 110 : Header.height,
                },
                headerTitle: "People Going",
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
        SignupLogin: {
            screen: SignupLoginScreen,
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
        PrivacyStatement: {
            screen: PrivacyStatementScreen,
            navigationOptions: {
                headerTitle: "Privacy Statement",
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
        Signup: {
            screen: SignupScreen,
            navigationOptions: {
                headerTitle: "Sign Up",
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
*/

//export default createAppContainer(EventNavigator);