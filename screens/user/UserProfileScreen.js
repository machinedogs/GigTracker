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
import { updateUserProfile } from "../../store/actions/user";
import { openImagePickerAsync, uploadImage, getImage } from '../../screens/helper/ImageHelpers'
import { saveProfileDataToStorage } from '../../screens/helper/secureStorageHelpers';

const UserProfileScreen = (props) => {
	const dispatch = useDispatch();
	var profileImage = useSelector((state) => state.user.profileImage);
	var user = useSelector((state) => state.user);

	let updateProfilePhoto = async () => {
		console.log('Inside update profile photo ');
		//Get image from camera library
		var file = await openImagePickerAsync();
		//Get image from firebase 
		var imageUrl = await getImage(file);
		//dispatch action
		dispatch(updateUserProfile(imageUrl));
		//Save uri to storage
		saveProfileDataToStorage(imageUrl);
	}

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
							onPress={updateProfilePhoto}
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
