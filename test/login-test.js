import chai from 'chai';
const expect = chai.expect;
import { validateLogIn } from '../src/login';

describe("Evaluate if login credentials are valid", function() {
    it("should return positive feedback if traveler/agent username is correct and password is correct", function() {
        const username = "traveler30";
        const password = "travel";
        let invalidUserName = validateLogIn(username, password);
        expect(invalidUserName).to.equal(`Login successful.`);
    });
    it("should return negative username feedback if traveler/agent username is incorrect", function() {
        const username = "David";
        const password = "travel";
        let invalidUserName = validateLogIn(username, password);
        expect(invalidUserName).to.equal(`Sorry, username ${username} is not recognized.`);
    });
    it("should return negative password feedback if traveler/agent password is incorrect", function() {
        const username = "traveler30";
        const password = "dingus";
        let invalidUserName = validateLogIn(username, password);
        expect(invalidUserName).to.equal(`Sorry, password is incorrect.`);
    });
    it("should return overall negative feedback if both traveler/agent username and password are incorrect", function() {
        const username = "David";
        const password = "dingus";
        let invalidUserName = validateLogIn(username, password);
        expect(invalidUserName).to.equal(`Sorry, both username: ${username} and password are not valid.`);
    });
});
