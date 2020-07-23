const PoliticsPin = require('../assets/Pins/PoliticsPin.png');
const SportsPin = require('../assets/Pins/SportsPin.png');
const MeetingPin = require('../assets/Pins/MeetingPin.png');
const FoodPin = require('../assets/Pins/FoodPin.png');
const ProtestPin = require('../assets/Pins/ProtestPin.png');
const PartyPin = require('../assets/Pins/PartyPin.png');
const MusicPin = require('../assets/Pins/MusicPin.png');
const MarketPin = require('../assets/Pins/MarketPin.png')
const DiscussionPin = require('../assets/Pins/DiscussionPin.png')
const OtherPin = require('../assets/Pins/OtherPin.png')
const ArtPin = require('../assets/Pins/ArtPin.png')

export const iconPicker = (category) => {
    let pinIcon;

    if (category === "music") {
        pinIcon = MusicPin;
        console.log("Marker Category: " + category)
    } else if (category === "meeting") {
        pinIcon = MeetingPin;
        console.log("Marker Category: " + category)
    } else if (category === "party") {
        pinIcon = PartyPin;
        console.log("Marker Category: " + category)
    } else if (category === "political") {
        pinIcon = PoliticsPin;
        console.log("Marker Category: " + category)
    } else if (category === "sports") {
        pinIcon = SportsPin;
        console.log("Marker Category: " + category)
    } else if (category === "food") {
        pinIcon = FoodPin;
        console.log("Marker Category: " + category)
    } else if (category === "protest") {
        pinIcon = ProtestPin;
        console.log("Marker Category: " + category)
    }
    else if (category === "art") {
        pinIcon = ArtPin;
        console.log("Marker Category: " + category)
    }
    else if (category === "market") {
        pinIcon = MarketPin;
        console.log("Marker Category: " + category)
    }
    else if (category === "discussion") {
        pinIcon = DiscussionPin;
        console.log("Marker Category: " + category)
    }
    else if (category === "other") {
        pinIcon = OtherPin;
        console.log("Marker Category: " + category)
    }

    return pinIcon;
}