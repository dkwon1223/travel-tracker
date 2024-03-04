import "./css/styles.scss"
import { validateLogIn } from './login';
import { createTrip, destinations, getTripCost } from "./traveler";
import { fetchDestinations, fetchTrips } from "./apiCalls";
import { easepick } from '@easepick/bundle';

const loginPage = document.querySelector(".login-page");
const logInButton = document.querySelector("#logInButton");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginErrorMessage = document.querySelector(".login-error-message");

const travelerDashboard = document.querySelector(".traveler-dashboard");
const userHeader = document.querySelector(".nav-user-info");
const signOutButton = document.querySelector("#signOutButton");
const destinationSelectButton = document.querySelector("#destinationSelectButton");
const destinationContainer = document.querySelector(".vacation-destinations");
const destinationCover = document.querySelector(".trip-request-cover");
const tripRequestForm = document.querySelector(".travel-inputs");
const tripDateInput = document.querySelector("#datepicker");
const tripTravelerCountInput = document.querySelector("#travelerCount");
const tripDestinationInput = document.querySelector("#destinationID");
const tripRequestFeedback = document.querySelector("#estimatedCostFeedback");
const confirmTripRequestButton = document.querySelector("#confirmRequestTripButton");
const tripsData = fetchTrips();
const data = await tripsData;
const trips = data.trips;
const tripsIDs = trips.map((trip) => {
    return trip.id;
})
let loggedInTraveler, tripDuration;
const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
    ],
    plugins: ['RangePlugin'],
    RangePlugin: {
        tooltip: true,
        tooltipNumber(num) {
            tripDuration = num - 1;
            return num - 1;
        }
    }
});


logInButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if(validateLogIn(username, password).includes("successful")) {
        loginErrorMessage.style.color = "green";
        loginErrorMessage.innerHTML = validateLogIn(username, password);
        setTimeout(() => {
            loginPage.classList.add("hidden");
            travelerDashboard.classList.remove("hidden");
            loggedInTraveler = JSON.parse(sessionStorage.getItem("loggedInTraveler"));
            userHeader.innerHTML += `${loggedInTraveler.name} the ${loggedInTraveler.travelerType} <br> UserID: ${loggedInTraveler.id}`;
        }, "2000");
    } else {
        loginErrorMessage.style.color = "red";
        loginErrorMessage.innerHTML = validateLogIn(username, password);
    }
})

signOutButton.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInTraveler");
    location.reload();
})

destinationSelectButton.addEventListener("click", () => {
    destinationContainer.classList.toggle("hidden");
    destinationCover.classList.toggle("hidden");
    loadDestinations();
})

async function loadDestinations() {
    destinations.forEach((destination) => {
        let card = document.createElement("div")
        card.setAttribute("class", "destination-card");
        card.setAttribute("id", `${destination.id}`);
        card.innerHTML = `<h4>${destination.destination}</h4><br>
                        <img src=${destination.image} alt=${destination.alt}>
                        <button id="targetDestinationButton">Select this Destination</button>`;
        destinationContainer.appendChild(card);
    })
    return destinations;
}

destinationContainer.addEventListener("click", (event) => {
    if(event.target.id === "targetDestinationButton") {
        tripDestinationInput.value = event.target.parentElement.id;
    }
})

function handleTripRequest(event) {
    event.preventDefault();
    if(!tripDateInput.value) {
        tripRequestFeedback.style.color = "red";
        tripRequestFeedback.innerHTML = "Please select a trip duration!"
    } else if(!tripTravelerCountInput.value) {
        tripRequestFeedback.style.color = "red";
        tripRequestFeedback.innerHTML = "Please select number of travelers!"
    } else if(!tripDestinationInput.value) {
        tripRequestFeedback.style.color = "red";
        tripRequestFeedback.innerHTML = "Please select a destination!";
    } else {
        let splitDates = tripDateInput.value.replace(/\s/g, "").split("-");
        let reformattedDate = `${splitDates[0]}/${splitDates[1]}/${splitDates[2]}`;
        let requestedTrip = createTrip((tripsIDs.length+1), loggedInTraveler.id, parseInt(tripDestinationInput.value), parseInt(tripTravelerCountInput.value), reformattedDate, tripDuration);
        getEstimatedCost(requestedTrip);
        confirmTripRequestButton.classList.remove("hidden");
    }
}

function getEstimatedCost(trip) {
    let requestedTripCost = getTripCost(trip);
    tripRequestFeedback.style.color = "green";
    tripRequestFeedback.innerHTML = `<strong>Your trip to ${requestedTripCost.destination} is estimated to have the following costs:</strong><br>
    <aside>
    Flights: $${requestedTripCost.flightCost}<br>
    Lodging: $${requestedTripCost.lodgingCost}<br>
    Total Cost: $${requestedTripCost.tripCost}<br>
    Agent Fee(10%): $${requestedTripCost.agentFee}<br>
    Total Cost with Agent Fee: $${requestedTripCost.totalCost}
    </aside>`;
}

tripRequestForm.addEventListener("submit", handleTripRequest);







