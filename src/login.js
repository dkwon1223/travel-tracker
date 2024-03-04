import { fetchTravelersData, fetchTraveler } from "./apiCalls";

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
        saveTraveler(currentID);
        return "Login successful. Redirecting...";
    } else if(password === "travel" || !currentID) {
        return `Sorry, username: ${username} is not recognized.`;
    } else if(username.startsWith("traveler") && travelersIDs.includes(currentID) && password !== "travel") {
        return "Sorry, password is incorrect.";
    }
}

async function saveTraveler(id) {
    const traveler = fetchTraveler(id);
    const data = await traveler;
    const loggedInTraveler = data;
    sessionStorage.setItem("loggedInTraveler", JSON.stringify(loggedInTraveler));
}

export { validateLogIn }