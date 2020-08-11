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
then returns this component. It takes two props, category and size to display.
 This is not the best way to do this if we intend to add more catefories.
Maybe could use some better design pattern because this wont scale. */
 const CustomMarker = (props) => {


     if (props.category === "music") {
        console.log("Marker Category: " + props.category)
        return (<MusicPin width={props.size} height={props.size} />);
    } else if (props.category === "meeting") {
        console.log("Marker Category: " + props.category)
        return (<MeetingPin width={props.size} height={props.size} />);
    } else if (props.category === "party") {
        console.log("Marker Category: " + props.category)
        return (<PartyPin width={props.size} height={props.size} />);
    } else if (props.category === "political") {
        console.log("Marker Category: " + props.category)
        return (<PoliticsPin width={props.size} height={props.size} />);
    } else if (props.category === "sports") {
        console.log("Marker Category: " + props.category)
        return (<SportsPin width={props.size} height={props.size} />);
    } else if (props.category === "food") {
        console.log("Marker Category: " + props.category)
        return (<FoodPin width={props.size} height={props.size} />);
    } else if (props.category === "protest") {
        console.log("Marker Category: " + props.category)
        return (<ProtestPin width={props.size} height={props.size} />);
    } else if (props.category === "art") {
        console.log("Marker Category: " + props.category)
        return (<ArtPin width={props.size} height={props.size} />);
    } else if (props.category === "market") {
        console.log("Marker Category: " + props.category)
        return (<MarketPin width={props.size} height={props.size} />);
    } else if (props.category === "discussion") {
        console.log("Marker Category: " + props.category)
        return (<DiscussionPin width={props.size} height={props.size} />);
    } else if (props.category === "other") {
        console.log("Marker Category: " + props.category)
        return (<OtherPin width={props.size} height={props.size} />);

    } 

}

export default CustomMarker;
