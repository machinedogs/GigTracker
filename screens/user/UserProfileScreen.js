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
	ActivityIndicator,
	RefreshControl
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button } from "native-base";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import { updateUserProfile } from "../../store/actions/user";
import {
	openImagePickerAsync,
	uploadImage,
	getImage,
} from "../../screens/helper/ImageHelpers";
import { saveProfileDataToStorage } from "../../screens/helper/secureStorageHelpers";
import * as userActions from "../../store/actions/user";
import * as eventActions from "../../store/actions/events";
import { EventCard } from "../../components/EventCard";
import { constructEvents } from "../../screens/helper/dataTransformation";
import { GetHostedEvents, GetSavedEvents } from "../../store/actions/events";
import Colors from '../../constants/Colors';

const UserProfileScreen = (props) => {
	const [savedRefreshing, setSavedRefreshing] = useState(false);
	const [goingRefreshing, setGoingRefreshing] = useState(false);
	const [hostedRefreshing, setHostedRefreshing] = useState(false);
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
	}

	const refreshSaved = useCallback(async () => {
		setSavedRefreshing(true);
		try {
			//await dispatch(GetHostedEvents(user));
			await dispatch(GetSavedEvents(user.accessToken));
			setSavedRefreshing(false)
		} catch (error) {
			console.error(error);
			setSavedRefreshing(false)
		}
	}, [savedRefreshing]);
	const refreshGoing = useCallback(async () => {
		setGoingRefreshing(true);
		try {
			//await dispatch(GetHostedEvents(user));
			await dispatch(userActions.getGoingEvents(user.accessToken));
			setGoingRefreshing(false)
		} catch (error) {
			console.error(error);
			setGoingRefreshing(false)
		}
	}, [goingRefreshing]);
	const refreshHosted = useCallback(async () => {
		setHostedRefreshing(true);
		try {
			//await dispatch(GetHostedEvents(user));
			await dispatch(GetHostedEvents(user.accessToken));
			setHostedRefreshing(false)
		} catch (error) {
			console.error(error);
			setHostedRefreshing(false)
		}
	}, [hostedRefreshing]);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.userImageContainer}>
					{loading ? (
						<ActivityIndicator style={styles.userImage} size="large" />
					) : (
							<TouchableOpacity onPress={updateProfilePhoto} >
								<Image
									style={styles.userImage}
									source={{ uri: profileImage }}
								/>
							</TouchableOpacity>
						)}
				</View>
				<View style={{ flexDirection: 'column', justifyContent: 'center', paddingLeft: 15, paddingRight: 20, maxWidth: '70%'}} >
					<Text style={styles.userNameText}>{user.userName}</Text>
					<Text style={styles.emailText}>{user.userEmail}</Text>
				</View>
			</View>
			<View style={styles.content}>
				<Tabs
					tabBarUnderlineStyle={Platform.OS === 'ios' ? Colors.purpleButton : 'white'}
					tabBarUnderlineStyle={{ backgroundColor: Colors.purpleButton }}
					tabBarActiveTextColor={Platform.OS === 'ios' ? Colors.purpleButton : 'white'}
				//tabBarInactiveTextColor={Platform.OS === 'ios' ? 'grey' : Colors.lightPurple}
				>
					<Tab heading="Saved" tabBarUnderlineStyle={Platform.OS === 'ios' ? Colors.purpleButton : 'white'}>

						<FlatList
							data={constructEvents(event.savedEvents)}
							renderItem={({ item }) =>
								<EventCard event={item} />
							}
							keyExtractor={(item) => item.id.toString()}
							refreshControl={
								<RefreshControl refreshing={savedRefreshing} onRefresh={refreshSaved} />
							}
						/>
					</Tab>
					<Tab heading="Going" tabBarUnderlineStyle={Platform.OS === 'ios' ? Colors.purpleButton : 'white'}>
						<FlatList
							data={constructEvents(user.goingEvents)}
							renderItem={({ item }) =>
								<EventCard event={item} />
							}
							keyExtractor={(item) => item.id.toString()}
							refreshControl={
								<RefreshControl refreshing={goingRefreshing} onRefresh={refreshGoing} />
							}
						/>
					</Tab>
					<Tab heading="Hosted" tabBarUnderlineStyle={Platform.OS === 'ios' ? Colors.purpleButton : 'white'}>
						<FlatList
							data={constructEvents(event.createdEvents)}
							renderItem={({ item }) =>
								<View>
									<EventCard event={item} />
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
							refreshControl={
								<RefreshControl refreshing={hostedRefreshing} onRefresh={refreshHosted} />
							}
						/>
					</Tab>
				</Tabs>
			</View>
		</View>
	);
};

UserProfileScreen.navigationOptions = navData => {
	return {
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName='ios-cog'
					onPress={() => {
						navData.navigation.navigate('Settings');
					}}
				/>
			</HeaderButtons>
		)
	}
}

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
		backgroundColor: '#2b2d2f',
		flexDirection: 'row',
		paddingHorizontal: 15,
		paddingVertical: 15
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
		borderRadius: 65,
		borderWidth: 4,
		height: 130,
		width: 130,
	},
	userImage: {
		borderColor: "#A5A5A5",
		borderRadius: 65,
		height: "100%",
		width: "100%",
	},
	userNameText: {
		color: "#FFF",
		fontSize: 24,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "left",
		fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
	},
	emailText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "left",
		fontFamily: Platform.OS === "ios" ? "Sinhala Sangam MN" : "",
	},
	buttonText: {
		color: Colors.purpleButton,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 18
	},
});
export default UserProfileScreen;
