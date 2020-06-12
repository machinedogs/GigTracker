import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile } from "../../store/actions/user";
import * as firebase from "firebase";
import { firebaseConfig } from "../../firebase/index";

const UserProfileScreen = (props) => {
	const dispatch = useDispatch();
	var profileImage = useSelector((state) => state.user.profileImage);

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
		return url;
	};
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					style={styles.wallpaper}
					source={{
						uri:
							"https://i.pinimg.com/originals/61/f5/fd/61f5fdd2641a22295b8ea7957fd80b50.jpg",
					}}
				/>
				<TouchableOpacity
					onPress={openImagePickerAsync}
					style={styles.avatarContainer}
				>
				<Image style={styles.avatar} source={{ uri: profileImage }} />
				</TouchableOpacity>
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
	container: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	wallpaper: {
		height: "100%",
		width: "100%",
	},
	header: {
		height: "25%",
	},
	contentHeader: {
		marginTop: 50,
	},
	content: {
		width: "100%",
		height: "100%",
	},
	avatarContainer: {
		backgroundColor: "#696969",
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 50,
		alignSelf: "center",
		position: "absolute",
		marginTop: 70,
	},
	avatar: {
		width: "100%",
		height: "100%",
		borderRadius: 63,
	},
});
export default UserProfileScreen;
