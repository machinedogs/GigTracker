import React, { Component, useState, useEffect, } from 'react';
import { Image } from 'react-native';

const PoliticsPin = require('../assets/Pins/PoliticsPin.png');
const SportsPin = require('../assets/Pins/SportsPin.png');
const MeetingPin = require('../assets/Pins/MeetingPin.png');
const FoodPin = require('../assets/Pins/FoodPin.png');
const ProtestPin = require('../assets/Pins/ProtestPin.png');
const PartyPin = require('../assets/Pins/PartyPin.png');
const MusicPin = require('../assets/Pins/MusicPin.png');

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
            key={`${extraData}`}
            source={pinIcon}
        />
    )
}


export default PinMarker;