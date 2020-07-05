import React from 'react';
import { Icon } from 'react-native-elements';
import { Share, View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';


export default ShareComponent = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'GIG TRACKER: testing sharing component',
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
        <TouchableOpacity onPress={onShare} style={{ marginTop: 10 }}>
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