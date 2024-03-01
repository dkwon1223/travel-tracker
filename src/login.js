import { fetchTravelersData } from "./apiCalls";

const travelersData = fetchTravelersData();
const data = await travelersData;
const travelers = data.travelers;
const travelersIDs = travelers.map((traveler) => {
    return traveler.id;
})

function validateLogIn(username, password) {
    let currentID;
    if(username.startsWith("traveler")) {
        currentID = parseInt(username.match(/[0-9]+/)[0],10);
    } 
    if(username.startsWith("traveler") && travelersIDs.includes(currentID) && password === "travel") {
        return "Login successful.";
    } else if(password === "travel" || !currentID) {
        return `Sorry, username: ${username} is not recognized.`;
    } else if(username.startsWith("traveler") && travelersIDs.includes(currentID) && password !== "travel") {
        return "Sorry, password is incorrect.";
    }
}

export { validateLogIn }