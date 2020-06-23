import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	Platform,
	ScrollView,
	SafeAreaView,
	Alert,
	TouchableOpacity,
	Modal,
	Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from "react-native-picker-select";
import {
	Textarea,
	Input,
	Item,
	Button,
	Icon,
	Header,
	Left,
	Body,
	Right,
	Title,
} from "native-base";
//import Modal from 'react-native-modal';
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import MapStyle from "../../constants/MapStyle";
import { useDispatch } from "react-redux";
import eventBuilder from "../../models/createEvent";
import * as eventActions from "../../store/actions/events";
import {
	uploadEventPhoto,
	getCurrentLocation,
	combineDateAndTime,
	stringifyDate,
	stringifyTime,
} from "../helper/createEventHelper";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CreateEventScreen = (props) => {
	//Initial states of event screen
	const initTitle = props.event ? props.event.title : "";
	const initDescription = props.event ? props.event.description : "";
	const initCategory = props.event ? props.event.category : "";
	const initDate = props.event ? props.event.date : new Date();
	const initTime = props.event ? props.event.date : new Date();
	const initImage = props.event ? props.event.image : "";

	//These states updated as user interacts with the screen
	const [title, setTitle] = useState(initTitle);
	const [description, setDescription] = useState(initDescription);
	const [location, setLocation] = useState("");
	const [date, setDate] = useState(initDate);
	const [time, setTime] = useState(initTime);
	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [category, setCategory] = useState(initCategory);
	const [showMap, setShowMap] = useState(false);
	const [image, setImage] = useState(initImage);

	const dispatch = useDispatch();

	let mapRef = useRef(null);
	let markerRef = useRef(null);

	//Updates event photo
	const updateEventPhoto = async () => {
		setImage(await uploadEventPhoto());
	};

	useEffect(() => {
		//We want the user  to pick the photo first then add descriptions and stuff
		getLocation();
		updateEventPhoto();
	}, []);

	const getLocation = async () => {
		const position = await getCurrentLocation();
		const currentLocation = {
			latitude: parseFloat(position.coords.latitude),
			longitude: parseFloat(position.coords.longitude),
		};
		console.log("Current Location");
		console.log(currentLocation);
		setLocation(currentLocation);
		return currentLocation;
	};
	const onChangeDate = (e, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDate(Platform.OS === "ios");
		setDate(currentDate);
	};

	const onChangeTime = (e, selectedTime) => {
		const currentTime = selectedTime || time;
		setShowTime(Platform.OS === "ios");
		setTime(currentTime);
	};

	const toggleShowDate = () => {
		showDate ? setShowDate(false) : setShowDate(true);
	};

	const toggleShowTime = () => {
		showTime ? setShowTime(false) : setShowTime(true);
	};

	const saveEvent = async () => {
		console.log(`Category is here.... ${category}`);
		if (
			title &&
			description &&
			location &&
			location.latitude &&
			location.longitude &&
			date &&
			category &&
			image.length > 3
		) {
			console.log(category);
			const newEvent = new eventBuilder(
				title,
				description,
				combineDateAndTime(date, time),
				image,
				category,
				location.latitude,
				location.longitude
			);
			console.log(`Dispatching event ${newEvent.title}`);
			await dispatch(eventActions.createEvent(newEvent));
			console.log("dispatching getEvents from create page");
			dispatch(eventActions.getEvents());
			props.navigation.navigate("Home");
		} else {
			//alert that event is not valid
			Alert.alert(
				"Incomplete form",
				"Fill out all event info before submitting.",
				[{ text: "OK" }]
			);
			console.log(`Category is here.... ${category} and ${category.value}`);
		}
	};

	//Sets location as user moves the marker on map
	const handleDragEnd = (e) => {
		setLocation({
			latitude: e.nativeEvent.coordinate.latitude,
			longitude: e.nativeEvent.coordinate.longitude,
		});
		console.log("lat: " + location.latitude + " long: " + location.longitude);
	};
	//This determines whether to show the map or not for user to pick location
	const toggleShowMap = () => {
		showMap ? setShowMap(false) : setShowMap(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View
					style={{
						padding: 12,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{image == "" ? (
						<TouchableOpacity
							style={styles.eventImageContainer}
							onPress={updateEventPhoto}
						>
							<ActivityIndicator style={styles.eventImage} size="large" />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.eventImageContainer}
							onPress={updateEventPhoto}
						>
							<Image source={{ uri: image }} style={styles.eventImage} />
						</TouchableOpacity>
					)}
					<Item rounded>
						<Input
							style={styles.titleStyle}
							onChangeText={(text) => setTitle(text)}
							value={title}
							placeholder={"Add a title..."}
						/>
					</Item>
					<Item rounded>
						<Textarea
							style={styles.descriptionStyle}
							onChangeText={(text) => setDescription(text)}
							value={description}
							placeholder={"Add a description..."}
							multiline
							numberOfLines={5}
						/>
					</Item>
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
						paddingBottom: 10,
						zIndex: 10,
						width: SCREEN_WIDTH,
					}}
				>
					<Text style={styles.text}>Category</Text>
					{Platform.OS === "ios" ? (
						<DropDownPicker
							items={[
								{ label: "Music", value: "music" },
								{ label: "Sports", value: "sports" },
								{ label: "Meeting", value: "meeting" },
								{ label: "Party", value: "party" },
								{ label: "Protest", value: "protest" },
								{ label: "Food", value: "food" },
								{ label: "Market", value: "market" },
								{ label: "Discussion", value: "discussion" },
								{ label: "Political", value: "political" },
								{ label: "Other", value: "other" },
							]}
							defaultValue={initCategory}
							placeholder="Select a category"
							containerStyle={{
								height: 50,
								width: 300,
								justifyContent: "center",
								alignItems: "center",
							}}
							style={{ borderColor: "gray", borderWidth: 1 }}
							dropdownStyle={{ borderColor: "gray", height: 300 }}
							itemStyle={{ alignItems: "center" }}
							onChangeItem={(category) => setCategory(category.value)}
						/>
					) : (
						<RNPickerSelect
							items={[
								{ label: "Music", value: "music" },
								{ label: "Sports", value: "sports" },
								{ label: "Art", value: "art" },
								{ label: "Meeting", value: "meeting" },
								{ label: "Party", value: "party" },
								{ label: "Protest", value: "protest" },
								{ label: "Food", value: "food" },
								{ label: "Market", value: "market" },
								{ label: "Discussion", value: "discussion" },
								{ label: "Political", value: "political" },
								{ label: "Other", value: "other" },
							]}
							style={{ borderColor: "gray", borderWidth: 1 }}
							onValueChange={(value) => setCategory(value)}
						/>
					)}
				</View>
				<View style={styles.container}>
					<Text
						style={{
							fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
						}}
					>
						Location:
					</Text>
					<Button
						iconRight
						light
						onPress={toggleShowMap}
						style={styles.buttonStyle}
					>
						<Text
							style={{
								fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
							}}
						>
							Drop a pin...
						</Text>
						<Icon name="pin" />
					</Button>
				</View>
				{console.log(`Here ${location.latitude}`)}
				{showMap && location.latitude && (
					<View style={styles.container}>
						<Modal
							onSwipeComplete={toggleShowMap}
							swipeDirection={"down"}
							backdropOpacity={0.3}
							onBackdropPress={toggleShowMap}
							swipeThreshold={100}
							TransitionOutTiming={0}
							borderRadius={10}
							propagateSwipe
						>
							<Header style={{ backgroundColor: "#2d3436" }}>
								<Left></Left>
								<Body>
									<Title
										style={{
											color: "#fff",
											fontFamily:
												Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
											fontSize: 20,
										}}
									>
										Select location
									</Title>
								</Body>
								<Right>
									<Button transparent onPress={toggleShowMap}>
										<Icon name="md-checkmark" />
									</Button>
								</Right>
							</Header>
							<View
								style={{
									backgroundColor: "#2d3436",
									zIndex: 100,
									borderColor: "#2d3436",
								}}
							>
								<Text
									style={{
										color: "white",
										padding: 10,
										fontSize: 15,
										fontFamily:
											Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
									}}
								>
									Hold the pin down for a second before dragging...
								</Text>
							</View>
							<MapView
								initialRegion={{
									latitude: location.latitude,
									latitudeDelta: LATITUDE_DELTA,
									longitude: location.longitude,
									longitudeDelta: LONGITUDE_DELTA,
								}}
								style={styles.mapStyle}
								provider={PROVIDER_GOOGLE}
								showsUserLocation
								showsMyLocationButton
								rotateEnabled={false}
								showsTraffic={false}
								toolbarEnabled={true}
								ref={mapRef}
								customMapStyle={MapStyle}
								clusterColor="#341f97"
							>
								<Marker
									ref={markerRef}
									coordinate={location}
									pinColor="#341f97"
									tracksViewChanges={false}
									draggable
									onDragEnd={handleDragEnd}
								/>
							</MapView>
						</Modal>
					</View>
				)}
				<View style={styles.container}>
					<Text
						style={{
							fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
						}}
					>
						Date:
					</Text>
					<Button
						iconRight
						light
						onPress={toggleShowDate}
						style={styles.buttonStyle}
					>
						<Text
							style={{
								textAlign: "center",
								fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
							}}
						>
							{stringifyDate(date)}
						</Text>
						<Icon name="calendar" />
					</Button>
				</View>
				{showDate && (
					<DateTimePicker value={date} mode={"date"} onChange={onChangeDate} />
				)}
				<View style={styles.container}>
					<Text
						style={{
							fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
						}}
					>
						Time:
					</Text>
					<Button
						iconRight
						light
						onPress={toggleShowTime}
						style={styles.buttonStyle}
					>
						<Text>{stringifyTime(time)}</Text>
						<Icon name="clock" />
					</Button>
				</View>
				{showTime && (
					<DateTimePicker
						value={time}
						mode={"time"}
						is24Hour={false}
						onChange={onChangeTime}
					/>
				)}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 10,
					}}
				>
					<Text></Text>
					<Button
						round
						light
						onPress={saveEvent}
						style={{
							borderWidth: 1,
							borderColor: "gray",
							alignContent: "center",
							justifyContent: "center",
							width: 125,
							height: 50,
							backgroundColor: "#fff",
						}}
					>
						<Text
							style={{
								fontSize: 22,
								color: "#2f3640",
								textAlign: "center",
								fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
							}}
						>
							Submit
						</Text>
					</Button>
				</View>
				<View style={styles.container}>
					<Text
						style={{
							color: "gray",
							fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
						}}
					>
						Note: If you are hosting this event at a private location, we
						recommend not using the exact location of your address but somewhere
						nearby. Include a contact where people can ask you directly for the
						address.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		width: SCREEN_WIDTH,
		padding: 10,
		backgroundColor: "#fff",
	},
	text: {
		fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
		fontSize: 16,
	},
	dropdownStyle: {
		width: 100,
	},
	titleStyle: {
		height: 50,
		borderColor: "gray",
		//borderWidth: 1,
		width: 350,
		fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
		fontSize: 16,
	},
	descriptionStyle: {
		borderColor: "gray",
		//borderWidth: 1,
		width: 350,
		height: 120,
		marginTop: 5,
		fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
		fontSize: 16,
	},
	modal: {
		flex: 1,
		marginTop: 300,
		borderRadius: 10,
		marginLeft: 0,
		marginRight: 0,
		maxHeight: SCREEN_HEIGHT * 0.6,
		backgroundColor: "#2d3436",
	},
	mapStyle: {
		zIndex: -1,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT * 0.85,
	},
	buttonStyle: {
		height: 50,
		width: 200,
		color: "black",
		borderColor: "gray",
		borderWidth: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "#2d3436",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	eventImageContainer: {
		borderColor: "gray",
		borderWidth: 5,
		height: 170,
		marginBottom: 15,
		width: SCREEN_WIDTH * 0.8,
	},
	eventImage: {
		height: "100%",
		width: "100%",
	},
});

export default CreateEventScreen;
