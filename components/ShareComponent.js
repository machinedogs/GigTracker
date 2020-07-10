import React from 'react';
import { Icon } from 'react-native-elements';
import { Share, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Linking } from 'expo';
import { useSelector } from "react-redux";

export default ShareComponent = (event) => {
    var user = useSelector((state) => state.user);


    let redirectUrl = Linking.makeUrl('eventScreen',{ eventID: `${event.event.event}` });
    const onShare = async () => {
        try {
            // event.event.event (this looks really bad)
            console.log("event id passed to deep link is : "+ event.event.event)
    
            console.log("redirect URL is: " + redirectUrl);
            console.log(Linking.openURL(redirectUrl))
            console.log('event passed to share message:' + event.event.title);
            const result = await Share.share({
                // add deep link here
                message:
                    `${user.userName} Shared the event: ${event.event.title}
                     hosted by: ${event.event.host.name},
                    located at ${event.event.location.address},
                     ${redirectUrl}
                    `
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <TouchableOpacity onPress={onShare.bind(this, event)} style={{ marginTop: 10 }}>
            <Icon
                name='share-alt'
                type='font-awesome'
                size={40}
                color={'black'}
            />
            <Text style={styles.ButtonText}>Share Event</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ButtonText: {
        margin: 10,
        color: 'black',
        textAlign: 'center',
    }
});
