import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Header, Content, Accordion, View } from "native-base";
import {
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EventImage } from './calloutEventImage';
import { UserImage } from './calloutUserImage';
import { WebView } from 'react-native-webview'


export const CustomCallout = (props) => {
   
    return (
        <Card>
            <View>
                <CardItem>
                    <Left>
                    <WebView style={{ height: 70, width: 70, paddingRight:100 }} source={{
                        html: UserImage(props)
                    }} />
                        <Body>
                            <Text>{props.event.host.name}</Text>
                            <Text note>{props.event.host.email}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <WebView style={{ height: 100, width: 300, }} source={{
                        html: EventImage(props.event)
                    }} />
                </CardItem>
                <Text style={styles.titleText}>{props.event.title}</Text>
                <Text>{props.event.description}</Text>
                <CardItem>
                    <Left>
                        <Entypo name="location-pin" size={20} color="black" />
                        <Text>{props.event.address}</Text>
                    </Left>
                    <Right>
                        <Text>{props.event.date}</Text>
                    </Right>
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
});
