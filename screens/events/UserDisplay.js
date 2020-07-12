import React from "react";
import { StyleSheet } from "react-native";
import {
	Container,
	Content,
	List,
	Card,
	ListItem,
	Left,
	Body,
	Thumbnail,
	Text,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";

const UserDisplay = (props) => {
	const people = useSelector((state) => state.events.eventGoing);

	return (
		<Card style={styles.container}>
			<Container>
				<Content>
					<List>
						{people.map((person, i) => (
							<ListItem key={i} avatar>
								{console.log("here is the person")}
								{console.log(person)}
								<Left>
									<Thumbnail source={{ uri: person.profile }} />
								</Left>
								<Body>
									<Text>{person.name}</Text>
								</Body>
							</ListItem>
						))}
					</List>
				</Content>
			</Container>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ffff",
	},
});

export default UserDisplay;
