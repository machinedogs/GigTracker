import React, { Component } from "react";
import { Image,StyleSheet } from "react-native";
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
import { Entypo } from '@expo/vector-icons'; 

export const EventCard = (props) => {
	return (
			<Content>
				<Card>
					<CardItem>
						<Left>
							<Thumbnail source={{ uri: props.event.host.profile }} />
							<Body>
								<Text>{props.event.host.name}</Text>
								<Text note>{props.event.host.email}</Text>
							</Body>
						</Left>
					</CardItem>
					<CardItem cardBody>
                    <Image source={{uri: props.event.image}} style={{height: 200, width: null, flex: 1}}/>
					</CardItem>
                        <Content padder>
                            <Text style={styles.titleText}>{props.event.title}</Text>
                            <Text>{props.event.description}</Text>
						</Content>
					<CardItem>
						<Left>
							<Entypo name="location-pin" size={20} color="black" />
							<Text>{props.event.address}</Text>
						</Left>
						<Right>
							<Text>{props.event.date}</Text>
						</Right>
					</CardItem>
				</Card>
			</Content>
	);
};

const styles = StyleSheet.create({
    // baseText: {
    //   fontFamily: "Cochin"
    // },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
  });
