import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

const PrivacyStatementScreen = props => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.privacyStatementContainer}>
                    <Text style={styles.privacyStatementText}>
                        We use your <Text style={{ color: Colors.purpleButton }}>email, username, and password</Text> for the sole purpose of  authenticating you when signing into our app.
                        {'\n\n'}
                        You can control the <Text style={{ color: Colors.purpleButton }}>visibility</Text> of the events you host, save, or go to in Profile {'>'} Account Settings {'>'} Visibility.
                        {'\n\n'}
                        When you <Text style={{ color: Colors.purpleButton }}>delete an event</Text> you hosted, it is wiped from our servers along with who attended your event.
                        {'\n\n'}
                        We <Text style={{ color: Colors.purpleButton }}>do not sell</Text> any of your information to data brokers. All of our information is self contained within our app.
                </Text>
                    <View style={{ flexDirection: 'row', paddingTop: 30 }}>
                        <Text>Read the </Text>
                        <TouchableOpacity>
                            <Text style={{ color: "#147EFB" }}>
                                full Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingTop: 30 }}>
                        <Button
                            round
                            light
                            style={styles.agreeButton}
                            onPress={() => {
                                props.navigation.navigate('Signup');
                            }}
                        >
                            <Text style={styles.buttonText}>
                                Agree
				            </Text>
                        </Button>
                    </View>
                    <View style={{ paddingTop: 15, paddingBottom: 30 }}>
                        <Button
                            round
                            light
                            style={styles.disagreeButton}
                            onPress={() => {props.navigation.navigate('Home');}}
                        >
                            <Text style={styles.buttonText}>
                                Disagree
				            </Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>


        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    },
    privacyStatementContainer: {
        paddingHorizontal: '10%',
        paddingTop: '10%'
    },
    privacyStatementText: {
        fontSize: 20
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    agreeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.purpleButton,
        borderRadius: 5,
    },
    disagreeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.darkPurple,
        borderRadius: 5,
    },
});

export default PrivacyStatementScreen;
