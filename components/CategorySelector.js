import React from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import { List, ListItem, Left, Right, Icon } from 'native-base';
import Colors from '../constants/Colors';

const CategorySelector = (props) => {
    return (
        <View style={{ ...props.style }}>
            <FlatList
                data={[
                    { type: "Party", id: "party" },
                    { type: "Food", id: "Food" },
                    { type: "Music", id: "music" },
                    { type: "Sports", id: "sports" },
                    { type: "Meeting", id: "meeting" },
                ]}
                renderItem={({ item }) =>
                    <ListItem noIndent onPress={() => { }}>
                        <Left>
                            <Text style={{ color: 'white' }}>{item.type}</Text>
                        </Left>
                        <Right>
                            <Icon type='AntDesign' name="checksquareo" color='white' style={{paddingRight: 10}} />
                        </Right>
                    </ListItem>
                }
                keyExtractor={(item) => item.id}
                indicatorStyle='white'
            />

            <View style={{ paddingHorizontal: 15, paddingVertical: 10, borderColor: 'white', borderTopWidth: 1 }}>
                <Text style={{ color: 'white' }}>Clear Filters</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});

export default CategorySelector;
