import React from 'react';
import { View, StyleSheet } from 'react-native';
import InsetShadow from 'react-native-inset-shadow'

const NeumorphicView = (props) => {

    let containerStyle = styles.container
    if (props.textArea) {
        containerStyle = styles.descriptionStyle
    }

    return (
        <View style={containerStyle}>
            <InsetShadow right={false} bottom={false} shadowOpacity={0.2} shadowRadius={5} shadowOffset={39} elevation={5}>
                <InsetShadow left={false} top={false} shadowColor='#d5d5d5' shadowRadius={5} shadowOffset={39} elevation={5} >
                    {props.children}
                </InsetShadow>
            </InsetShadow>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        width: '100%',
        height: 45,
        overflow: 'hidden',
    },
    descriptionStyle: {
        borderRadius: 5,
        width: '100%',
        height: 150,
        overflow: 'hidden'
    },
    upperLeftShadows: {

    },
    bottomRightShadows: {

    }
});

export default NeumorphicView;