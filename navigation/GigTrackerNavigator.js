import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import MapScreen from '../screens/events/MapScreen';
import CreateEventScreen from '../screens/user/CreateEventScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import ManageEventScreen from '../screens/user/ManageEventScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import DeleteScreen from '../screens/user/DeleteScreen';

const EventNavigator = createStackNavigator(
    {
        Startup: StartupScreen,
        Home: {
            screen: MapScreen, 
            navigationOptions: {
                headerTitle: 'Mapper',
                headerTitleStyle: {
                    fontFamily: 'jack-silver',
                    fontSize: 32,
                    justifyContent: 'center'
                },
                headerStyle: {
                    backgroundColor: Colors.darkPurple,
                    height: 110
                },
                headerTintColor: Colors.lightText,
                gestureEnabled: false, // this stops us from swiping back to startup screen
            },
        },
        CreateEvent: CreateEventScreen,
        UserProfile: UserProfileScreen,
        ManageEvent: ManageEventScreen,
        Auth: AuthScreen,
        Delete: DeleteScreen
    }
);

export default createAppContainer(EventNavigator);