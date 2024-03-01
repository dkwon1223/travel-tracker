import chai from 'chai';
const expect = chai.expect;
import { validateLogIn } from '../src/login';

describe("Evaluate if login credentials are valid", function() {
    it("should return negative feedback if traveler/agent username is incorrect", function() {
        const username = "David";
        const password = "travel";
        let invalidUserName = validateLogIn(username, password);
        expect(invalidUserName).to.equal(`Sorry, username ${username} is not valid.`);
    });
});
