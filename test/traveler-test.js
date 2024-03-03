import chai from 'chai';
const expect = chai.expect;
import { createTrip } from '../src/traveler';

describe("Evaluate if traveler trip requests behave correctly", function() {
    it("should return an object that follows trip API structure", function() {
        const exampleTrip = createTrip(13, 34, 7, 3, "2022/08/02", 7);
        expect(exampleTrip).to.deep.equal({
            id: 13,
            userID: 34,
            destinationID: 7,
            travelers: 3,
            date: "2022/08/02",
            duration: 7,
            status: "pending",
            suggestedActivities: []
        })
    });
});