import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
	Card,
	Thumbnail,
	Text,
	Right,
} from "native-base";
import InsetShadow from 'react-native-inset-shadow';

import { makeStreetAddress, makeFullAddress } from "../helper/calloutHelper";
import { stringifyDateShort } from '../helper/createEventHelper';


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
						<Thumbnail source={{ uri: props.event.host.profile }} />
						<Text style={styles.hostNameText}>{props.event.host.name}</Text>
					</View>
				</Right>
			</View>
			<View style={styles.imageContainer}>
				<InsetShadow elevation={5} shadowRadius={3}>
					<Image
						source={{ uri: props.event.image }}
						style={styles.image}
					/>
				</InsetShadow>
			</View >
			<View style={styles.footer}>
				<View style={{ width: '80%' }}>
					{
						props.streetAddress ?
							<Text>{makeStreetAddress(props.event.location.address)}</Text>
							:
							<Text>{makeFullAddress(props.event.location.address)}</Text>
					}
					<Text style={styles.dateTimeText} >
						{stringifyDateShort(new Date(props.event.date))}{", "}
						{new Date(props.event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</Text>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Text>{props.event.attending}</Text>
					<Text>Going</Text>
				</View>
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
		paddingBottom: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	dateTimeText: {
		color: 'grey'
	}
});