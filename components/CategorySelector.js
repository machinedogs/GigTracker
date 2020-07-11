import React from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, Left, Right, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import * as eventActions from '../store/actions/events';

const CategorySelector = (props) => {
    const filters = useSelector(state => state.events.filters);
    const dispatch = useDispatch();

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
                    <ListItem noIndent onPress={() => {
                        {
                            filters.includes(item.id) ?
                                (dispatch(eventActions.removeFilter(item.id))) :
                                (dispatch(eventActions.addFilter(item.id)))
                        }
                    }}>
                        <Left>
                            <Text style={{ color: 'white' }}>{item.type}</Text>
                        </Left>
                        <Right>
                            <AntDesign
                                name={filters.includes(item.id) ? "checkcircle" : "checkcircleo"}
                                color='white'
                                style={{ paddingRight: 13 }}
                                size={18}
                            />
                        </Right>
                    </ListItem>
                }
                keyExtractor={(item) => item.id}
                indicatorStyle='white'
            />

            <View style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderColor: 'white',
                borderTopWidth: 1,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => {
                    dispatch(eventActions.clearFilters())
                }}>
                    <Text style={{ color: 'white' }}>Clear Filters</Text>
                </TouchableOpacity>

            </View>

        </View >
    );
}

const styles = StyleSheet.create({});

export default CategorySelector;
