import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";

const UserProfileScreen = (props) => {
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
				<Image
					style={styles.avatar}
					source={{
						uri:
							"https://filmdaily.co/wp-content/uploads/2020/05/avatar_lede-1300x976.jpg",
					}}
				/>
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
    backgroundColor: '#696969'
	},
	wallpaper: {
		height: "100%",
		width: "100%",
	},
	header: {
    height: '25%'
  },
  contentHeader:{
    marginTop:50
  },
  content:{
    width: "100%",
    height: "100%"
  },
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 50,
		alignSelf: "center",
		position: "absolute",
		marginTop: 70,
	}
});

export default UserProfileScreen;
