import Event from '../models/event';
import Host from '../models/host';
import Location from '../models/host';
export const Host_Person = 
    new Host(
        "https://firebasestorage.googleapis.com/v0/b/gigg-146b7.appspot.com/o/images%2Fgf0ugg?alt=media&token=b0666290-24db-4b4e-a8a8-b1fcc8ae2585",
        "fake1",
        "fake1@gmail.com"
        );
export const Host_Person2 = 
        new Host(
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            "fake2",
            "fake2@gmail.com"
            )
export const location = new Location(39.952461,-75.163714, 'Temple University' )

export const EVENTS = [
    new Event(
        'e1',
        'Partyy at my crib',
        'Its a party man, bring the booze',
        '6-14-2020',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'party',
        location,
        Host_Person
    ),
    new Event(
        'e2',
        'Partyy at my crib',
        'Its a party man, bring the booze',
        '6-14-2020',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'music',
        40.952461,
        -75.163714,
        'Temple University',
        Host_Person
    )
];

export const event = new Event(
    'e1',
    'Partyy at my crib',
    'Its a party man, bring the booze',
    '6-14-2020',
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'party',
    location,
    Host_Person
)

export const events = [
    new Event(
    'e1',
    'Partyy at my crib',
    'Its a party man, bring the booze',
    '6-14-2020',
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'party',
    location,
    Host_Person2
    ),
    new Event(
        'e2',
        'Partyy at my crib',
        'Its a party man, bring the booze',
        '6-14-2020',
        'https://www.godominicanrepublic.com/wp-content/uploads/2019/11/coco-bongo-last-party-of-the-year.jpg',
        'party',
        location,
        Host_Person
        )
]