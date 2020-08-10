import DiscussionPin from '../components/Pins/DisscussionPin'

const PoliticsPin = Platform.OS === 'ios' ?  require('../assets/Pins/ios/politicsPin.png') : require('../assets/Pins/android/PoliticsPin.png');
const SportsPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/sportsPin.png') : require('../assets/Pins/android/SportsPin.png');
const MeetingPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/meetingPin.png') : require('../assets/Pins/android/MeetingPin.png');
const FoodPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/foodPin.png') : require('../assets/Pins/android/FoodPin.png');
const ProtestPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/protestPin.png') : require('../assets/Pins/android/ProtestPin.png');
const PartyPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/partyPin.png') : require('../assets/Pins/android/PartyPin.png');
const MusicPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/musicPin.png') : require('../assets/Pins/android/MusicPin.png');
const MarketPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/marketPin.png') : require('../assets/Pins/android/MarketPin.png')
//const DiscussionPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/discussionPin.png') : require('../assets/Pins/android/DiscussionPin.png')
const OtherPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/otherPin.png') : require('../assets/Pins/android/OtherPin.png')
const ArtPin = Platform.OS === 'ios' ? require('../assets/Pins/ios/artPin.png') : require('../assets/Pins/android/ArtPin.png')




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
        pinIcon = <DiscussionPin />;
        console.log("Marker Category: " + category)
    }
    else if (category === "other") {
        pinIcon = OtherPin;
        console.log("Marker Category: " + category)
    }

    return pinIcon;
}