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

const stringifyDate = (date) => {
	var dd = date.getDate();
	var mm = date.getMonth() + 1;
	var yyyy = date.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	var wkday = date.getDay();
	if (wkday === 0) wkday = "Sun";
	else if (wkday === 1) wkday = "Mon";
	else if (wkday === 2) wkday = "Tues";
	else if (wkday === 3) wkday = "Wed";
	else if (wkday === 4) wkday = "Thurs";
	else if (wkday === 5) wkday = "Fri";
	else if (wkday === 6) wkday = "Sat";
	return wkday + ", " + mm + "/" + dd + "/" + yyyy;
};

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
						{stringifyDate(new Date(props.event.date))}{", "}
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