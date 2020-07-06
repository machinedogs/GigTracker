import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
	Image,
	ImageBackground,
	Platform,
	StyleSheet,
	ScrollView,
	FlatList,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button } from "native-base";
import { updateUserProfile } from "../../store/actions/user";
import {
	openImagePickerAsync,
	uploadImage,
	getImage,
} from "../../screens/helper/ImageHelpers";
import { saveProfileDataToStorage } from "../../screens/helper/secureStorageHelpers";
import * as authActions from "../../store/actions/user";
import * as eventActions from "../../store/actions/events";
import { EventCard } from "../../components/EventCard";
import { constructEvents } from "../../screens/helper/dataTransformation";
import { GetHostedEvents, GetSavedEvents } from "../../store/actions/events";
import Colors from '../../constants/Colors';

const UserProfileScreen = (props) => {
	const dispatch = useDispatch();
	var profileImage = useSelector((state) => state.user.profileImage);
	var user = useSelector((state) => state.user);
	var event = useSelector((state) => state.events);
	//state specific to component
	const [loading, setLoading] = useState(false);

	let updateProfilePhoto = async () => {
		console.log("Inside update profile photo ");
		//Get image from camera library
		setLoading(true);
		var file = await openImagePickerAsync();
		//Only update if they picked image
		if (file) {
			//Set loading to true because we are uploading and retrieving new image
			setLoading(true);
			//Get image from firebase
			var imageUrl = await getImage(file);
			//dispatch action
			console.log("Dispatching update user profile with ");
			console.log(user);
			console.log(
				`Dispatching update user profile with this image url ${imageUrl} and this user ${user}`
			);
			saveProfileDataToStorage(imageUrl);
			await dispatch(updateUserProfile(imageUrl, user));
			setLoading(false);
		}
		setLoading(false);
	};
	const getHostedEvents = async (user) => {
		console.log("Dispatching get hosted events action from mapscreen");
		console.log(user.accessToken);
		dispatch(GetHostedEvents(user));
	};
	const getSavedEvents = async (user) => {
		console.log("Dispatching get saved events action from mapscreen");
		console.log(user.accessToken);
		dispatch(GetSavedEvents(user));
	};

	const handleDelete = async (event) => {
		Alert.alert(
			"Delete Event",
			"Are you sure you want to delete this event?",
			[
				{
					text: "Yes",
					onPress: () => dispatch(eventActions.deleteEvent(event)),
					style: 'destructive'
				},
				{
					text: "No",
					onPress: () => console.log("Delete Event Canceled"),
					style: "cancel"
				}
			],
			{ cancelable: false }
		);
		getHostedEvents(user);
	}

	useEffect(() => {
		getHostedEvents(user);
		getSavedEvents(user);
	}, [loading, profileImage]);

	const editEvent = (event) => {
		console.log('\nthe title of the event is ' + event.title + '\n');
		console.log('blah Blah ' + event);
		props.navigation.navigate('CreateEvent', { event: event });
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.headerColumn, { paddingLeft: 20 }}>
						<View style={{ flexDirection: 'row', paddingTop: 15, }}>
							<TouchableOpacity
								onPress={updateProfilePhoto}
								style={styles.userImageContainer}
							>
								{loading ? (
									<ActivityIndicator style={styles.userImage} size="large" />
								) : (
										<Image
											style={styles.userImage}
											source={{ uri: profileImage }}
										/>
									)}
							</TouchableOpacity>
							<View style={{ flexDirection: 'column', justifyContent: 'center', paddingLeft: 50 }} >
								<Text style={styles.userNameText}>{user.userName}</Text>
								<Text style={styles.emailText}>{user.userEmail}</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.content}>
					<Tabs tabBarUnderlineStyle={{ backgroundColor: Colors.purpleButton }}>
						<Tab heading="Saved Events" activeTextStyle={{ color: Colors.purpleButton }}>

							<FlatList
								data={constructEvents(event.savedEvents)}
								renderItem={({ item }) =>

									<TouchableOpacity onPress={() => {
										props.navigation.navigate('EventScreen', { event: item });
									}}>
										<EventCard event={item} />
									</TouchableOpacity>
								}
								keyExtractor={(item) => item.id.toString()}
								scrollEnabled={false}

							/>
						</Tab>
						<Tab heading="Hosted Events" activeTextStyle={{ color: Colors.purpleButton }}>
							<FlatList
								data={constructEvents(event.createdEvents)}
								renderItem={({ item }) =>
									<View>
										<TouchableOpacity onPress={() => {
											props.navigation.navigate('EventScreen', { event: item });
										}}>
											<EventCard event={item} hosting={false} />
										</TouchableOpacity>
										<View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 15 }}>
											<Button full transparent light
												onPress={() => {
													props.navigation.navigate('CreateEvent', { event: item })
												}}
											>
												<Text style={styles.buttonText}>Edit</Text>
											</Button>
											<Button
												iconRight
												transparent
												light
												title='Delete'
												onPress={() => {
													handleDelete(item)
												}}
											>
												<Text style={styles.buttonText}>Delete</Text>
											</Button>
										</View>
									</View>
								}
								keyExtractor={(item) => item.id.toString()}
								scrollEnabled={false}
							/>
						</Tab>
					</Tabs>
				</View>
				<View style={styles.ButtonContainer}>
					<Button light transparent full
						title="Logout"
						onPress={() => {
							dispatch(authActions.logout());
							props.navigation.navigate("Home");
						}}
					>
						<Text style={styles.buttonText}>Logout</Text>
					</Button>
					<Button light transparent full
						title="Delete Account"
						onPress={() => {
							// Take user to delete account screen and let them delete
							props.navigation.navigate("Delete");
						}}
					>
						<Text style={styles.buttonText}>Delete Account</Text>
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: "#FFF",
		borderWidth: 0,
		flex: 1,
		margin: 0,
		padding: 0,
	},
	ButtonContainer: {
		height: "100%",
		width: "100%",
		flex: 1,
	},
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	content: {
		width: "100%",
		height: "100%",
		flex: 5,
	},
	headerBackgroundImage: {
		paddingBottom: 20,
		paddingTop: 35,
	},
	headerContainer: {
		// height:'35%',
		backgroundColor: '#2b2d2f',
	},
	headerColumn: {
		//backgroundColor: "transparent",
		...Platform.select({
			ios: {
				alignItems: "flex-start",
				elevation: 1,
				marginTop: -1,
			},
			android: {
				alignItems: "flex-start",
			},
		}),
	},
	scroll: {
		backgroundColor: "#FFF",
	},
	userImageContainer: {
		borderColor: "#FFFFFF",
		borderRadius: 85,
		borderWidth: 4,
		height: 170,
		marginBottom: 15,
		width: 170,
	},
	userImage: {
		borderColor: "#A5A5A5",
		borderRadius: 85,
		height: "100%",
		width: "100%",
	},
	userNameText: {
		color: "#FFF",
		fontSize: 24,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "left",
		fontFamily: "Sinhala Sangam MN",
	},
	emailText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "left",
		fontFamily: "Sinhala Sangam MN",
	},
	buttonText: {
		color: Colors.purpleButton,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 18
	},
});
export default UserProfileScreen;
