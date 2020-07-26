import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Thumbnail, Right, Left, Icon as VectorIcon } from "native-base";
import { Icon } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	Platform,
	Linking,
	Dimensions
} from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import InsetShadow from "react-native-inset-shadow";
import ShareComponent from "../../components/ShareComponent";
import { formatStandardTime } from "../../helper/timeFormater";
import { makeFullAddress } from "../../helper/calloutHelper";
import Colors from "../../constants/Colors";
import * as eventActions from "../../store/actions/events";
import * as userActions from "../../store/actions/user";


// this function returns the screen elements for the event screen
// this should take the event or event id as a prop. we should also
// save the isEventSaved in a redux store for persistance.

const EventScreen = (props) => {
	const userName = useSelector((state) => state.user.userName);
	const accessToken = useSelector((state) => state.user.accessToken);
	const savedEvents = useSelector((state) => state.events.savedEvents);
	const goingEvents = useSelector((state) => state.user.goingEvents);
	const event = props.navigation.getParam("event");
	const [numGoing, setNumGoing] = useState(event.attending);

	console.log("this is the event " + JSON.stringify(event));
	// See if user previously saved the event
	var initialEventSaveState;
	const existingSavedIndex = savedEvents.findIndex(
		(myEvent) => myEvent.event === event.event
	);
	if (existingSavedIndex >= 0) {
		// check if index exists
		initialEventSaveState = true;
	} else {
		initialEventSaveState = false;
	}
	// See if user has already said they are going to an event
	var initialEventGoingState;
	const existingGoingIndex = goingEvents.findIndex(
		(myEvent) => myEvent.event === event.event
	);
	if (existingGoingIndex >= 0) {
		// check if index exists
		initialEventGoingState = true;
	} else {
		initialEventGoingState = false;
	}

	const [isEventSaved, setEventSaved] = useState(initialEventSaveState);
	const [isGoing, setGoing] = useState(initialEventGoingState);

	const dispatch = useDispatch();

	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
	const latLng = `${event.location.latitude},${event.location.longitude}`;
	const label = `${event.title}`;
	const url = Platform.select({
		ios: `${scheme}${label}@${latLng}`,
		android: `${scheme}${latLng}(${label})`
	});

	const pressAddress = () => {
		console.log("pressing address link");
		Linking.openURL(url);

	}

	//  for icon color selection
	const toggleSaveButton = () => {
		// dispatch action
		if (!isEventSaved) {
			dispatch(eventActions.saveEvent(event));
		} else {
			// indicating user unsaved the event
			dispatch(eventActions.unsaveEvent(event));
		}
		setEventSaved(!isEventSaved);
		console.log(isEventSaved);
	};

	const toggleGoingButton = () => {
		// dispatch action
		if (!isGoing) {
			setNumGoing(numGoing + 1);
			dispatch(userActions.addToGoingEvents(event));
		} else {
			// indicating user is no longer going to the event
			setNumGoing(numGoing - 1);
			dispatch(userActions.removeFromGoingEvents(event));
		}
		setGoing(!isGoing);
		console.log(isGoing);
	};

	const navigateToGoingList = () => {
		console.log('dispatching get people going')
		dispatch(eventActions.getPeopleGoing(event.event, accessToken));
		props.navigation.navigate('GoingListScreen');
	};

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
		if (wkday === 0) wkday = "Sunday";
		else if (wkday === 1) wkday = "Monday";
		else if (wkday === 2) wkday = "Tuesday";
		else if (wkday === 3) wkday = "Wednesday";
		else if (wkday === 4) wkday = "Thursday";
		else if (wkday === 5) wkday = "Friday";
		else if (wkday === 6) wkday = "Saturday";
		return wkday + ", " + mm + "/" + dd + "/" + yyyy;
	};

	return (
		<ScrollView
			style={{ backgroundColor: "white" }}
			showsVerticalScrollIndicator={false}
		>
			<View style={{ flexDirection: "row", padding: 15 }}>
				<View style={styles.titleDescriptionContainer}>
					<Text style={styles.titleText}>{event.title}</Text>
				</View>
				<View style={{ alignSelf: "flex-end" }}>
					<View style={styles.hostContent}>
						<Thumbnail source={{ uri: event.host.profile }} />
						<Text style={styles.hostNameText}>{event.host.name}</Text>
					</View>
				</View>
			</View>
			<Grid>
				<Col size={1} style={{ height: 275, paddingHorizontal: 15 }}>
					<InsetShadow>
						<Image style={{ flex: 1 }} source={{ uri: event.image }} />
					</InsetShadow>
				</Col>
			</Grid>
			<View
				style={{
					flexDirection: "row",
					padding: 15
				}}
			>
				<Left style={{ height: "auto", justifyContent: "center" }}>
					<TouchableOpacity onPress={pressAddress}>
						<Text style={{ fontSize: 15, color: "#147EFB" }} >
							{makeFullAddress(event.location.address)}
						</Text>
					</TouchableOpacity>
					<View style={{ flexDirection: 'row', paddingTop: 8}}>
						<Text style={styles.categoryText}>Category: </Text>
						<Text style={styles.categoryText}>{event.category}</Text>
					</View>
				</Left>
				<Right size={2} style={{ height: "auto" }}>
					{Platform.OS === "ios" ? (
						<Text style={{ fontSize: 35, color: "black" }}>
							{new Date(event.date).toLocaleTimeString("en-US", {
								hour: "2-digit",
								minute: "2-digit",
								hour12: true,
							})}
						</Text>
					) : (
							// format time for android
							<Text style={{ fontSize: 35, color: "black" }}>
								{formatStandardTime(event.date)}
							</Text>
						)}

					<Text style={{ fontSize: 20, color: "black" }}>
						{stringifyDate(new Date(event.date))}
					</Text>
				</Right>
			</View>

			<Grid>
				<Col size={1} style={{ height: "auto", justifyContent: "center" }}>
					<InsetShadow
						shadowRadius={1}
						shadowColor="black"
						left={false}
						right={false}
						shadowOpacity={1}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingVertical: 15,
								paddingHorizontal: 15,
							}}
						>
							<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={navigateToGoingList}>
								<VectorIcon name="persona" type='Zocial' style={{ color: Colors.purpleButton, paddingRight: 10 }} />
								<Text style={styles.goingText}> {numGoing} Going</Text>
							</TouchableOpacity>
							{userName != event.host.name && userName ? (
								<TouchableOpacity onPress={toggleGoingButton}>
									<View
										style={{
											backgroundColor: isGoing
												? "#f5b800"
												: Colors.lightBackground,
											borderRadius: 5,
											borderColor: isGoing ? "#f5b800" : Colors.lightBackground,
											borderWidth: 2,
											paddingHorizontal: 10,
											paddingVertical: 5,
										}}
									>
										<Text style={styles.goingText}>Going</Text>
									</View>
								</TouchableOpacity>
							) : null}
						</View>
					</InsetShadow>
				</Col>
			</Grid>
			<View style={{ padding: 15 }}>
				<Text style={styles.Description}>{event.description}</Text>
			</View>
			<Grid>
				{userName != event.host.name && userName ? ( // make sure user is not the host and is logged in
					<Col>
						<TouchableOpacity
							onPress={toggleSaveButton}
							style={{ marginTop: 10, marginBottom: 10 }}
						>
							<Icon
								name="save"
								type="font-awesome"
								size={40}
								color={isEventSaved ? "#f5b800" : "black"}
							/>
							<Text style={styles.ButtonText}>
								{isEventSaved ? "Unsave Event" : "Save Event"}
							</Text>
						</TouchableOpacity>
					</Col>
				) : null}
				<Col size={1} style={{ width: 75 }}>
					<ShareComponent event={event} />
				</Col>
				{userName === event.host.name && userName ? (
					//user is the host and can edit the event
					<Col>
						<TouchableOpacity
							onPress={() => {
								props.navigation.navigate('CreateEvent', { event: event })
							}}
							style={{ marginTop: 10, marginBottom: 10 }}
						>
							<Icon
								name="edit"
								type="vector-icons"
								size={40}
								color={isEventSaved ? "#f5b800" : "black"}
							/>
							<Text style={styles.ButtonText}>
								Edit Event
							</Text>
						</TouchableOpacity>
					</Col>
				) : null}
			</Grid>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		paddingHorizontal: 15,
		paddingTop: 15,
	},
	container: {
		height: '30%',
		width: '100%'
	},
	titleDescriptionContainer: {
		justifyContent: "center",
		flex: 4,
	},
	hostContainer: {
		alignSelf: "flex-end",
		flex: 2,
	},
	hostContent: {
		alignItems: "center",
	},
	hostNameText: {
		paddingTop: 5,
		fontSize: 13,
		color: "black",
	},
	titleText: {
		color: "black",
		fontSize: 32,
	},
	ButtonText: {
		margin: 10,
		color: "black",
		textAlign: "center",
	},
	Description: {
		color: "black",
		backgroundColor: "white",
		fontSize: 17,
	},
	goingText: {
		color: "black",
		fontSize: 20,
	},
	categoryText: {
		fontSize: 18,
		color: 'gray'
	},
});

export default EventScreen;
