import React from 'react';
import { Icon } from 'react-native-elements';
import { Share, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

export default ShareComponent = (event) => {
    var user = useSelector((state) => state.user);
    const onShare = async () => {
        try {
            console.log('event passed to share message:' + event.event.title);
            const result = await Share.share({
                // add deep link here
                message:
                    `${user.userName} Shared the event: ${event.event.title}
                     hosted by: ${event.event.host.name},
                    located at ${event.event.location.address}
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
