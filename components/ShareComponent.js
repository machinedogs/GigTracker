import React from 'react';
import { Icon } from 'react-native-elements';
import { Share, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

export default ShareComponent = (props) => {
    var user = useSelector((state) => state.user);
    const onShare = async () => {
        try {
            console.log('event passed to share message:' + props.event.title);
            const result = await Share.share({
                // add deep link here
                message:
                    `${user.userName} Shared the event: ${props.event.title}
                     hosted by: ${props.event.host.name},
                    located at ${props.event.location.address}
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
