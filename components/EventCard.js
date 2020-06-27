import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Dimensions, Platform } from "react-native";
import { Container, Header, Content, Accordion } from "native-base";
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
import { WebView } from 'react-native-webview'
import InsetShadow from 'react-native-inset-shadow'
import { Entypo } from "@expo/vector-icons";

const makeStreetAddress = (address) => {
	var tokens = address.split(", ");
	var result = tokens[0] + " " + tokens[1]
	return result;
}

const makeFullAddress = (address) => {
	var tokens = address.split(", ");
	tokens.pop()
	tokens.pop()
	tokens.pop()
	var result = tokens.join(", ")
	return result;
}

export const EventCard = (props) => {
	return (
		<Card style={{ ...props.style }} >
			<View style={styles.header}>
				<View style={styles.titleDescriptionContainer}>
					<Text style={styles.titleText}>{props.event.title}</Text>
					{
						props.event.description.length > 50 ?
							<Text>{props.event.description.substring(0, 50)}...</Text> :
							<Text>{props.event.description}</Text>
					}
				</View>
				<Right style={styles.hostContainer}>
					<View style={styles.hostContent}>
						{Platform.OS === 'ios' ?
							(
								<Thumbnail source={{ uri: props.event.host.profile }} />
							) :
							( // dispaly webview for android
								<WebView
									style={{ height: 80, width: 80, paddingRight: 100 }}
									source={{
										html: UserImage(props)
									}}
								/>
							)
						}
						<Text style={styles.hostNameText}>{props.event.host.name}</Text>
					</View>
				</Right>
			</View>
			<View style={styles.imageContainer}>
				<InsetShadow elevation={5} shadowRadius={3}>
					{Platform.OS === 'ios' ?
						(<Image
							source={{ uri: props.event.image }}
							style={styles.image}
						/>) :
						(<WebView
							style={{ height: 200, width: 300 }}
							source={{
								html: EventImage(props.event)
							}}
						/>)
					}
				</InsetShadow>
			</View >
			<View style={styles.footer}>
				{
					props.streetAddress ?
						<Text>{makeStreetAddress(props.event.location.address)}</Text>
						:
						<Text>{makeFullAddress(props.event.location.address)}</Text>
				}
				<Text style={styles.dateTimeText} >
					{new Date(props.event.date).toLocaleDateString()}{", "}
					{new Date(props.event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</Text>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		paddingTop: 15
	},
	titleDescriptionContainer: {
		justifyContent: 'center',
		flex: 5,
		alignSelf: 'center'
	},
	hostContainer: {
		alignSelf: 'flex-end',
		flex: 3
	},
	hostContent: {
		alignItems: 'center'
	},
	hostNameText: {
		paddingTop: 5,
		fontSize: 13
	},
	imageContainer: {
		height: 200,
		paddingHorizontal: 15,
		paddingVertical: 10
	},
	image: {
		height: 200,
		width: null,
		flex: 1
	},
	footer: {
		paddingHorizontal: 15,
		paddingBottom: 15
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	dateTimeText: {
		color: 'grey'
	}
});