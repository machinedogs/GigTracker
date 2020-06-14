import Event from '../models/event';
import Host from '../models/host';

export const Host_Person = 
    new Host(
        "https://firebasestorage.googleapis.com/v0/b/gigg-146b7.appspot.com/o/images%2Fgf0ugg?alt=media&token=b0666290-24db-4b4e-a8a8-b1fcc8ae2585",
        "fake1",
        "fake1@gmail.com"
        )

export const EVENTS = [
    new Event(
        'e1',
        'Partyy at my crib',
        'Its a party man, bring the booze',
        '6-14-2020',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'party',
        39.952461,
        -75.163714,
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
    39.952461,
    -75.163714,
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
    39.952461,
    -75.163714,
    Host_Person
    ),
    new Event(
        'e2',
        'Partyy at my crib',
        'Its a party man, bring the booze',
        '6-14-2020',
        'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'party',
        39.952461,
        -75.163714,
        Host_Person
        )
]