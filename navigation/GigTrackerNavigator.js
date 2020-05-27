import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapScreen from '../screens/events/MapScreen';
import CreateEventScreen from '../screens/user/CreateEventScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import ManageEventScreen from '../screens/user/ManageEventScreen';

const EventNavigator = createStackNavigator(
    {
        Home: {
            screen: MapScreen, 
            navigationOptions: {
                header: null,
            },
        },
        CreateEvent: CreateEventScreen,
        UserProfile: UserProfileScreen,
        ManageEvent: ManageEventScreen
    }
);

export default createAppContainer(EventNavigator);