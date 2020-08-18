import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import MapScreen from '../screens/events/MapScreen';
import CreateEventScreen from '../screens/user/CreateEventScreen';
import UserProfileScreen, {
    screenOptions as UserProfileScreenOptions
} from '../screens/user/UserProfileScreen';
import EventScreen from '../screens/events/EventScreen'
import StartupScreen from '../screens/StartupScreen';
import DeleteScreen from '../screens/user/DeleteScreen';
import SettingsScreen from '../screens/user/SettingsScreen';
import UserDisplay from '../screens/events/UserDisplay';
import SignupLoginScreen from '../screens/auth/SignupLoginScreen';
import PrivacyStatementScreen from '../screens/auth/PrivacyStatementScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import NotificationScreen from '../screens/notifications/NotificationsScreen';

const WIDTH = Dimensions.get('window').width;

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.darkGrey,
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

// The User navigator when user is signed in
const UserTabNavigator = createBottomTabNavigator();
// The Guest navigator when user is not signed in
const GuestTabNavigator = createBottomTabNavigator();

// Stack Navigators
const HomeStackNavigator = createStackNavigator(); // Both in Guest & Main Navigator
const CreateStackNavigator = createStackNavigator();
const UserStackNavigator = createStackNavigator();
const FeedStackNavigator = createStackNavigator();
const NotificationStackNavigator = createStackNavigator();
const AuthStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <HomeStackNavigator.Screen
                name="EventScreen"
                component={EventScreen}
                options={{ title: "event details" }}
            />
            <HomeStackNavigator.Screen
                name="GoingListScreen"
                component={UserDisplay}
                options={{ title: "People Going" }}
            />
        </HomeStackNavigator.Navigator>
    )

}

export const CreateNavigator = () => {
    return (
        <CreateStackNavigator.Navigator>
            <CreateStackNavigator.Screen
                name="CreateEvent"
                component={CreateEventScreen}
                options={{
                    title: "create event",
                }}
            />
        </CreateStackNavigator.Navigator>
    )

}

export const UserProfileNavigator = () => {
    return (
        <UserStackNavigator.Navigator>
            <UserStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={UserProfileScreenOptions}
            />
            <UserStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Settings" }}
            />
            <UserStackNavigator.Screen
                name="Delete"
                component={DeleteScreen}
                options={{ title: "Delete Account" }}
            />
        </UserStackNavigator.Navigator>
    )

}

export const FeedNavigator = () => {
    return (
        <FeedStackNavigator.Navigator>
            <UserStackNavigator.Screen
                name="Feed"
                component={FeedScreen}
                options={{ title: "Feed" }}
            />
        </FeedStackNavigator.Navigator>
    )

}

export const NotificationNavigator = () => {
    return (
        <NotificationStackNavigator.Navigator>
            <NotificationStackNavigator.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ title: "Notifications" }}
            />
        </NotificationStackNavigator.Navigator>
    )
}

/*
MainTabNavigator
 Home 
    - Map *
    - Event *
    - User Display *
 Create
    - Create Event (same as edit Event) *
 User
    - User Profile *
    - Settings *
    - Delete *
 Feed
    - Friends Feed * 
    - Discovery Feed (not needed now)
 Notification
    - Notification Screen (User only: friend requests, going updates, ...) *
*/
export const UserNavigator = () => {
    return (
        <UserTabNavigator.Navigator screenOptions={defaultNavOptions} >
            <UserTabNavigator.Screen name="Home" component={HomeNavigator} />
            <UserTabNavigator.Screen name="Feed" component={FeedNavigator} />
            <UserTabNavigator.Screen name="Create" component={CreateNavigator} />
            <UserTabNavigator.Screen name="Notification" component={NotificationNavigator} />
            <UserTabNavigator.Screen name="User" component={UserProfileNavigator} />
        </UserTabNavigator.Navigator>
    )
}

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name="SignupLogin"
                component={SignupLoginScreen}
                options={{ title: "Account" }}
            />
            <AuthStackNavigator.Screen
                name="PrivacyStatement"
                component={PrivacyStatementScreen}
                options={{ title: "Privacy Statement" }}
            />
            <AuthStackNavigator.Screen
                name="Signup"
                component={SignupScreen}
                options={{ title: "Sign Up" }}
            />
        </AuthStackNavigator.Navigator>
    )
}

/*
GuestNavigator
 Home 
    - Startup *
    - Map *
    - Event * 
    - User Display *
 Auth
    - Signup/login *
    - Privacy Statement *
    - Signup *
*/

export const GuestNavigator = () => {
    return (
        <GuestTabNavigator.Navigator screenOptions={defaultNavOptions} >
            <GuestTabNavigator.Screen name="Home" component={HomeNavigator} />
            <GuestTabNavigator.Screen name="Auth" component={AuthNavigator} />
        </GuestTabNavigator.Navigator>
    )
}
