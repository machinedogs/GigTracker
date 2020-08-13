import DiscussionPin from '../assets/Pins/DisscussionPin'
import SportsPin from '../assets/Pins/SportsPin'
import MeetingPin from '../assets/Pins/MeetingPin'
import FoodPin from '../assets/Pins/FoodPin'
import ProtestPin from '../assets/Pins/ProtestPin'
import PartyPin from '../assets/Pins/PartyPin'
import MusicPin from '../assets/Pins/MusicPin'
import OtherPin from '../assets/Pins/OtherPin'
import ArtPin from '../assets/Pins/ArtPin'
import PoliticsPin from '../assets/Pins/PoliticsPin'
import MarketPin from '../assets/Pins/MarketPin'
import React from 'react';




/* This function creates the correct custom marker using an SVG file,
then returns this component. It takes two props, category and size to display. */
const EventPin = (props) => {

    // add categories here
    const categorySVG = {
        ["music"]: <MusicPin width={props.size} height={props.size} />,
        ["meeting"]: <MeetingPin width={props.size} height={props.size} />,
        ["party"]: <PartyPin width={props.size} height={props.size} />,
        ["political"]: <PoliticsPin width={props.size} height={props.size} />,
        ["sports"]: <SportsPin width={props.size} height={props.size} />,
        ["food"]: <FoodPin width={props.size} height={props.size} />,
        ["protest"]: <ProtestPin width={props.size} height={props.size} />,
        ["art"]: <ArtPin width={props.size} height={props.size} />,
        ["market"]: <MarketPin width={props.size} height={props.size} />,
        ["discussion"]: <DiscussionPin width={props.size} height={props.size} />,
        ["other"]: <OtherPin width={props.size} height={props.size} />,
    }
    const eventPin = categorySVG[props.category];

    if (!eventPin) {
        console.log("CustomMarker.js/EventPin() - No event of type" + props.event + " found");
        return null
    };

    return (eventPin);

}

export default EventPin;
