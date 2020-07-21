import { makeStreetAddress, makeFullAddress} from '../screens/helper/calloutHelper';

describe('makeStreetAddress', () => {
    it('returns street address for addresses that start with number', () => {
        const address = "4, Essex Street, South Beach, San Francisco, California, 94107, United States of America"

        const result = makeStreetAddress(address);
        const expected = "4 Essex Street"

        expect(result).toEqual(expected);
    });
    it('returns street address for addresses that start with a road name', () => {
        const address = "Schuylkill Avenue, Point Breeze Refinery South Yard, South Philadelphia, Philadelphia, Philadelphia County, Pennsylvania, 19145, United States of America"

        const result = makeStreetAddress(address);
        const expected = "Schuylkill Avenue"

        expect(result).toEqual(expected);
    });
});

describe('makeFullAddress', () => {
    it('returns full address for addresses that start with number', () => {
        const address = "4, Essex Street, South Beach, San Francisco, California, 94107, United States of America"

        const result = makeFullAddress(address);
        const expected = "4 Essex Street,\nSan Francisco, California,\n94107"

        expect(result).toEqual(expected);
    });
    it('returns full address for addresses that start with a road name', () => {
        const address = "Schuylkill Avenue, Point Breeze Refinery South Yard, South Philadelphia, Philadelphia, Philadelphia County, Pennsylvania, 19145, United States of America"

        const result = makeFullAddress(address);
        const expected = "Schuylkill Avenue,\nPhiladelphia, Pennsylvania,\n19145"

        expect(result).toEqual(expected);
    });
});