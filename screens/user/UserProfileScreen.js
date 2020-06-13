import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
	Image,
	ImageBackground,
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile } from "../../store/actions/user";
import * as firebase from "firebase";
import { firebaseConfig } from "../../firebase/index";
import * as SecureStore from "expo-secure-store";

const UserProfileScreen = (props) => {
	const dispatch = useDispatch();
	var profileImage = useSelector((state) => state.user.profileImage);
	var user = useSelector((state) => state.user);

	//Function that lets you pick the image from your library
	let openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (!pickerResult.cancelled) {
			//generate random file name
			var fileName = Math.random().toString(36).substring(7);
			console.log(`Random File Name ${fileName}`);
			var response = await uploadImage(pickerResult.uri, fileName);
			console.log("About to dispatch action with file name");
			dispatch(updateUserProfile(await getImage(fileName)));
		}
	};
	//Uploads image
	uploadImage = async (uri, imageName) => {
		console.log("In upload");
		const response = await fetch(uri);
		const blob = await response.blob();
		if (firebase.apps.length === 0) {
			firebase.initializeApp(firebaseConfig);
		}
		var ref = firebase.storage().ref().child(`images/${imageName}`);
		return ref.put(blob);
	};

	//get image from firebase
	getImage = async (path) => {
		console.log(`Getting Image with name ${path}`);
		var url = await firebase
			.storage()
			.ref()
			.child(`images/${path}`)
			.getDownloadURL();
		console.log(`Got image from firebase. here it is.... ${url}`);
		//Save uri to storage
		saveDataToStorage(url);
		return url;
	};

	//Saves profile uri to local machine storage
	const saveDataToStorage = async (profileImage) => {
		console.log(
			`Save to storage got the uri....${profileImage}...securely storing it`
		);
		SecureStore.setItemAsync(
			"images",
			JSON.stringify({
				profileImage: profileImage,
			})
		);
	};
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<ImageBackground
					style={styles.headerBackgroundImage}
					blurRadius={10}
					source={{
						uri:
							"https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-018.jpg",
					}}
				>
					<View style={styles.headerColumn}>
						<TouchableOpacity
							onPress={openImagePickerAsync}
							style={styles.userImageContainer}
						>
							<Image style={styles.userImage} source={{ uri: profileImage }} />
						</TouchableOpacity>
						<Text style={styles.userNameText}>{user.userName}</Text>
						<Text style={styles.emailText}>{user.userEmail}</Text>
					</View>
				</ImageBackground>
			</View>
			<View style={styles.content}>
				<Tabs>
					<Tab heading="Hosted Events"></Tab>
					<Tab heading="Saved Events"></Tab>
				</Tabs>
			</View>
		</View>
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
	container: {
		flex: 1,
	},
	content: {
		width: "100%",
		height: "100%",
	},
	headerBackgroundImage: {
		paddingBottom: 20,
		paddingTop: 35,
	},
	headerContainer: {},
	headerColumn: {
		backgroundColor: "transparent",
		...Platform.select({
			ios: {
				alignItems: "center",
				elevation: 1,
				marginTop: -1,
			},
			android: {
				alignItems: "center",
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
		fontSize: 22,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "center",
	},
	emailText: {
		color: "#FFF",
		fontSize: 14,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "center",
	},
});
export default UserProfileScreen;
