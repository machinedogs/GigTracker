import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import {
    Card,
    CardItem,
    Text,
    Left,
    Right,
} from "native-base";
import { WebView } from 'react-native-webview'

import { makeStreetAddress } from "../helper/calloutHelper";
import { EventImage } from './calloutEventImage';
import { UserImage } from './calloutUserImage';

export const CustomCallout = (props) => {

    return (
        <Card style={{ ...props.style }}>
            <View>
                <CardItem>
                    <Left>
                        <View>
                            <Text style={styles.titleText}>{props.event.title}</Text>
                            {
                                props.event.description.length > 50 ?
                                    <Text>{props.event.description.substring(0, 50)}...</Text> :
                                    <Text>{props.event.description}</Text>
                            }
                        </View>
                    </Left>
                    <Right>
                        <View style={{ flex: 1, alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                            <WebView
                                style={{ height: 80, width: 80, }}
                                source={{ html: UserImage(props) }}
                            />
                            <Text>{props.event.host.name}</Text>
                        </View>
                    </Right>
                </CardItem>
                <CardItem cardBody paddingHorizontal={15}>
                    <WebView
                        style={{ height: 200, width: props.style.width }}
                        source={{ html: EventImage(props.event) }}
                    />
                </CardItem>
                <CardItem style={styles.footer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column', width: '80%' }}>
                            <Text>
                                {makeStreetAddress(props.event.location.address)}
                            </Text>
                            <Text style={styles.dateTimeText}>
                                {new Date(props.event.date).toLocaleDateString()}{", "}
                                {new Date(props.event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/(:\d{2}| [AP]M)$/, "")}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{props.event.attending}</Text>
                                <Text>Going</Text>
                        </View>
                    </View>
                </CardItem>
            </View>

        </Card>
    );
};


const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    dateTimeText: {
        color: 'grey'
    },
    footer: {
		paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
});
