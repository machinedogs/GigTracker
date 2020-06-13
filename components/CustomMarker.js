import React, { Component, useState, useEffect, } from 'react';
import { Image } from 'react-native';

const PinMarker = (props) => {

    const [extraData, setExtraData] = useState(false);
    useEffect(() => { setExtraData(true); }, []);

    let pinIcon;
    
    if (props.category === "music") {
        pinIcon = require('../assets/Pins/MusicPin.png');
        console.log("Marker Category: " + props.category)
    }
    else if (props.category === "meeting") {
        pinIcon = require('../assets/Pins/MeetingPin.png');
        console.log("Marker Category: " + props.category)
    } else if (props.category === "party") {
        pinIcon = require('../assets/Pins/PartyPin.png');
        console.log("Marker Category: " + props.category)
    }

    return (
        <Image
            style={{ maxHeight: 75, maxWidth: 75 }}
            // check for platform here, this is because with android we need to force a rerender
            key={Platform.OS === 'android' ? `${extraData}` : null}
            source={pinIcon}
        />
    )
}


export default PinMarker;