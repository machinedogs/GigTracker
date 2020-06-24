import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
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
import { Entypo } from "@expo/vector-icons";

import { stringifyDate, stringifyTime } from '../screens/helper/createEventHelper';

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
		<Card style={{ ...styles.card, ...props.style }} >
			<CardItem>
				<Left>
					<View>
						<Text style={styles.titleText}>{props.event.title}</Text>
					</View>
				</Left>
				<Right>
					<View style={{ alignItems: 'center' }} >
						<Thumbnail source={{ uri: props.event.host.profile }} />
						<Text>By {props.event.host.name}</Text>
					</View>
				</Right>
			</CardItem>
			<CardItem cardBody>
				<Image
					source={{ uri: props.event.image }}
					style={{ height: 200, width: null, flex: 1 }}
				/>
			</CardItem>
			<CardItem>
				<View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
					<Left>
						<Entypo name="location-pin" size={20} color="black" />
						{props.streetAddress ?
							<Text>{makeStreetAddress(props.event.location.address)}</Text>
							:
							<Text>{makeFullAddress(props.event.location.address)}</Text>
						}
					</Left>
					<Right  >
						<Text>{new Date(props.event.date).toLocaleDateString()}{"\n"}{new Date(props.event.date).toLocaleTimeString()}</Text>
					</Right>
				</View>
			</CardItem>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {

	},
	// baseText: {
	//   fontFamily: "Cochin"
	// },
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
});