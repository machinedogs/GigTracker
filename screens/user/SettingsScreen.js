import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { CommonActions } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'

import * as authActions from '../../store/actions/user';
import Colors from '../../constants/Colors';

export const SettingsScreen = (props) => {
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true);
    }

    return (
        <Container>

            <Content>
                <ListItem itemDivider>
                    <Text>Account Management</Text>
                </ListItem>
                <ListItem icon first onPress={() => {
                    dispatch(authActions.logout());
                    // v4: props.navigation.navigate("Home");
                    /* v5:
                        props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'Home',
                            })
                        );
                        */
                }}>
                    <Left>
                        <Button style={{ backgroundColor: Colors.yellow }}>
                            <Icon active name="exit-to-app" type="MaterialIcons" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Logout</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon last onPress={() => {
                    // v4: props.navigation.navigate('Delete');
                    props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Delete',
                        })
                    );
                }}>
                    <Left>
                        <Button style={{ backgroundColor: Colors.darkGrey }}>
                            <Icon active name="exit-run" type="MaterialCommunityIcons" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Delete Account</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon last onPress={() => {
                    //toggle dark mode
                    toggleDarkMode();
                    EventRegister.emit(
                        'toggleTheme',
                         darkMode
                        )
                }}>
                    <Left>
                        <Button style={{ backgroundColor: Colors.darkGrey }}>
                            <Icon active name="settings" type="MaterialCommunityIcons" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Dark Mode</Text>
                    </Body>
                </ListItem>
                <ListItem itemDivider>
                    <Text></Text>
                </ListItem>
                <Text style={{ padding: 10, alignSelf: 'center' }}>Made with ❤️ and 🍺 by Machinedogs</Text>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({

});

export default SettingsScreen;