import chai from 'chai';
const expect = chai.expect;
import { createTrip, getTripCost } from '../src/traveler';

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
        });
    });
});

describe("Evaluate if traveler trip estimated cost behaves correctly", function() {
    it("should return an object that has properties of cost breakdown for a trip", function() {
        const exampleTrip = createTrip(210, 23, 1, 2, "2023/08/09", 4);
        const exampleTripCost = getTripCost(exampleTrip);
        expect(exampleTripCost).to.deep.equal({
            destination: "Lima, Peru",
            flightCost: 800,
            lodgingCost: 560,
            tripCost: 1360,
            agentFee:  136,
            totalCost: 1496
        })
    });
});