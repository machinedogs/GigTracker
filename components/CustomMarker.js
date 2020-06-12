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
    // this state is to force a rerender of the image, this is a known issue with android react native maps.
    const [extraData, setExtraData] = useState(false);
    const [category, setCategory] = useState();
    

    useEffect(() => { setExtraData(true); }, []);
    useEffect(() => {
        if (props.category === "music") {
            setCategory(MusicPin);
            console.log(props.category)
            console.log("marker category " + category);
        }
        else
            if (props.category === "meeting") {
                setCategory(MeetingPin);
                console.log("marker category " + category);
            } else
                if (props.category === "party") {
                    setCategory(PartyPin);
                    console.log("marker category " + category);
                }
        console.log("marker category " + category);

    }, []);
    return (
        <Image
            style={{ maxHeight: 75, maxWidth: 75 }}
            key={`${extraData}`}
            source={category}
        />
    )
}

export default PinMarker;