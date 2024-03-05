import "./css/styles.scss"
import { validateLogIn } from './login';
import { createTrip, destinations, getTripCost } from "./traveler";
import { fetchTrips, postTrip } from "./apiCalls";
import { easepick } from '@easepick/bundle';

const loginPage = document.querySelector(".login-page");
const logInButton = document.querySelector("#logInButton");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginErrorMessage = document.querySelector(".login-error-message");
const travelerDashboard = document.querySelector(".traveler-dashboard");
const userHeader = document.querySelector(".nav-user-info");
const requestTripButton = document.querySelector("#requestTripButtonNav");
const yourTripsButton = document.querySelector("#yourTripsButtonNav");
const yourSpendingButton = document.querySelector("#yourSpendingButtonNav");
const signOutButton = document.querySelector("#signOutButton");
const destinationSelectButton = document.querySelector("#destinationSelectButton");
const destinationContainer = document.querySelector(".vacation-destinations");
const destinationCover = document.querySelector(".trip-request-cover");
const tripRequestForm = document.querySelector(".travel-inputs");
const tripDateInput = document.querySelector("#datepicker");
const tripDateDiv = document.querySelector("#travelInput");
const tripTravelerCountInput = document.querySelector("#travelerCount");
const tripDestinationInput = document.querySelector("#destinationID");
const tripRequestFeedback = document.querySelector("#estimatedCostFeedback");
const confirmTripRequestButton = document.querySelector("#confirmRequestTripButton");
const pastTripsContainer = document.querySelector("#pastTripsContainer");
const upcomingTripsContainer = document.querySelector("#upcomingTripsContainer");
const yearButtonsSection = document.querySelector(".year-buttons");
const tripsSpendingContainer = document.querySelector(".spending-list");
const totalSpent = document.querySelector("#totalSpent");
const tripsData = fetchTrips();
const data = await tripsData;
const trips = data.trips;
const tripsIDs = trips.map((trip) => {
    return trip.id;
})
const today = new Date();
let loggedInTraveler, tripDuration, requestedTrip;


if(document.readyState === "complete" && sessionStorage.getItem("loggedInTraveler") !== null) {
    renderTravelerDashboard();
    loadPastTrips();
    loadUpcomingTrips();
    loadTripYears();
} 

const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
    ],
    plugins: ['RangePlugin', 'KbdPlugin'],
    RangePlugin: {
        tooltip: true,
        tooltipNumber(num) {
            tripDuration = num - 1;
            return num - 1; 
        }
    },
    KbdPlugin: {
        dayIndex: 13,
        unitIndex: 14    
    }  
});



function renderTravelerDashboard() {
    loginPage.classList.add("hidden");
    travelerDashboard.classList.remove("hidden");
    loggedInTraveler = JSON.parse(sessionStorage.getItem("loggedInTraveler"));
    userHeader.innerHTML += `${loggedInTraveler.name} the ${loggedInTraveler.travelerType} <br> UserID: ${loggedInTraveler.id}`;
}

function loadDestinations() {
    destinations.forEach((destination) => {
        let card = document.createElement("div");
        card.setAttribute("class", "destination-card");
        card.setAttribute("id", `${destination.id}`);
        card.innerHTML = `<h4>${destination.destination}</h4><br>
                        <img src=${destination.image} alt=${destination.alt}>
                        <button id="targetDestinationButton" tabindex="10">Select this Destination</button>`;
        destinationContainer.appendChild(card);
    })
    return destinations;
}

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
        processTrip();
        getEstimatedCost(requestedTrip);
        confirmTripRequestButton.classList.remove("hidden");
    }
}

function processTrip() {
    let splitDates = tripDateInput.value.replace(/\s/g, "").split("-");
    let reformattedDate = `${splitDates[0]}/${splitDates[1]}/${splitDates[2]}`;
    requestedTrip = createTrip((tripsIDs.length+1), loggedInTraveler.id, parseInt(tripDestinationInput.value), parseInt(tripTravelerCountInput.value), reformattedDate, tripDuration);
}

function getEstimatedCost(trip) {
    let requestedTripCost = getTripCost(trip);
    tripRequestFeedback.style.color = "green";
    tripRequestFeedback.innerHTML = `<strong>Your trip to ${requestedTripCost.destination} is estimated to have the following costs:</strong><br>
    <aside>
    Flights: $${Intl.NumberFormat("en-US").format(requestedTripCost.flightCost)}<br>
    Lodging: $${Intl.NumberFormat("en-US").format(requestedTripCost.lodgingCost)}<br>
    Total Cost: $${Intl.NumberFormat("en-US").format(requestedTripCost.tripCost)}<br>
    Agent Fee(10%): $${Intl.NumberFormat("en-US").format(requestedTripCost.agentFee)}<br>
    Total Cost with Agent Fee: $${Intl.NumberFormat("en-US").format(requestedTripCost.totalCost)}
    </aside>`;
}

function loadPastTrips() {
    let allTrips = trips.reduce((acc, trip) => {
        if(trip.userID === loggedInTraveler.id) {
            acc.push(trip);
        }
        return acc;
    }, []);
    let pastTrips = allTrips.filter((trip) => {
        let tripDate = new Date(trip.date);
        return tripDate < today;
    });
    pastTrips.forEach((trip) => {
        let card = document.createElement("div");
        card.setAttribute("class", "past-trip-card");
        card.setAttribute("tabindex", 17);
        let destinationName = destinations.find((destination) => {
            return destination.id === trip.destinationID;
        }).destination;
        let destinationPic = destinations.find((destination) => {
            return destination.id === trip.destinationID;
        }).image;
        card.innerHTML = `<h3>Trip to ${destinationName} on ${trip.date}</h3><br>
                        <img src=${destinationPic} alt="stock photo of ${destinationName}"/>`;
        pastTripsContainer.appendChild(card);
    })
}

function loadUpcomingTrips() {
    let allTrips = trips.reduce((acc, trip) => {
        if(trip.userID === loggedInTraveler.id) {
            acc.push(trip);
        }
        return acc;
    }, []);
    let upcomingTrips = allTrips.filter((trip) => {
        let tripDate = new Date(trip.date);
        return tripDate > today;
    });
    upcomingTrips.forEach((trip) => {
        let card = document.createElement("div");
        card.setAttribute("class", "upcoming-trip-card");
        card.setAttribute("tabindex", 19);
        let destinationName = destinations.find((destination) => {
            return destination.id === trip.destinationID;
        }).destination;
        let destinationPic = destinations.find((destination) => {
            return destination.id === trip.destinationID;
        }).image;
        if(trip.status === "pending") {
            card.innerHTML = `<h3>Upcoming Trip to ${destinationName} on ${trip.date}</h3><br>
                        <img src=${destinationPic} alt="stock photo of ${destinationName}"/><br>
                        <h4>Status: <strong>${trip.status.toUpperCase()}</strong></h4>`;
        } else {
            card.innerHTML = `<h3>Upcoming Trip to ${destinationName} on ${trip.date}</h3><br>
                        <img src=${destinationPic} alt="stock photo of ${destinationName}"/><br>
                        <h4>Status: <span>${trip.status.toUpperCase()}</span></h4>`;
        }
        upcomingTripsContainer.appendChild(card);
    })
}

function loadTripYears() {
    let allTrips = trips.reduce((acc, trip) => {
        if(trip.userID === loggedInTraveler.id) {
            acc.push(trip);
        }
        return acc;
    }, []);
    let pastTrips = allTrips.filter((trip) => {
        let tripDate = new Date(trip.date);
        return tripDate < today;
    });
    let years = pastTrips.reduce((acc, trip) => {
        let tripDate = new Date(trip.date);
        if(!acc.includes(tripDate.getFullYear())) {
            acc.push(tripDate.getFullYear());
        }
        return acc;
    }, []);
    years.forEach((year) => {
        let yearButton = document.createElement("button");
        yearButton.setAttribute("class", "year-button");
        yearButton.setAttribute("id", `${year}`);
        yearButton.setAttribute("tabindex", 19  );    
        yearButton.innerText = `${year}`;
        yearButtonsSection.appendChild(yearButton);
    });
}

function loadTripsSpending(year) {
    tripsSpendingContainer.innerHTML = ``;
    let sum = 0;
    let allTrips = trips.reduce((acc, trip) => {
        if(trip.userID === loggedInTraveler.id) {
            acc.push(trip);
        }
        return acc;
    }, []);
    let pastTrips = allTrips.filter((trip) => {
        let tripDate = new Date(trip.date);
        return tripDate < today;
    });
    let yearTrips = pastTrips.filter((trip) => {
        let tripDate = new Date(trip.date);
        return tripDate.getFullYear() === year;
    });
    yearTrips.forEach((trip) => {
        let card = document.createElement("div");
        card.setAttribute("class", "trip-spending-card");
        let tripCost = getTripCost(trip)
        card.innerHTML = `<strong>Your trip to ${tripCost.destination} expenses:</strong><br>
        <aside>
        Flights: $${Intl.NumberFormat("en-US").format(tripCost.flightCost)}<br>
        Lodging: $${Intl.NumberFormat("en-US").format(tripCost.lodgingCost)}<br>
        Total Cost: $${Intl.NumberFormat("en-US").format(tripCost.tripCost)}<br>
        Agent Fee(10%): $${Intl.NumberFormat("en-US").format(tripCost.agentFee)}<br>
        Total Cost with Agent Fee: $${Intl.NumberFormat("en-US").format(tripCost.totalCost)}
        </aside>`;
        sum += tripCost.totalCost;
        tripsSpendingContainer.appendChild(card);
    });
    totalSpent.innerHTML = `$${Intl.NumberFormat("en-US").format(sum)}`;
}

function formatShadowDOM() {
    const spans = document.querySelectorAll("span");
    let spansArray = Array.from(spans);
    let calendarOpener = spansArray.find((span) => {
        return span.id !== "cvd_extension_svg_filter" && !span.classList.contains("easepick-wrapper");
    })
    let calendar = spansArray.find((span) => {
        return span.classList.contains("easepick-wrapper");
    })
    calendar.setAttribute("tabindex", 13);
    calendarOpener.style.position = "initial";
    calendarOpener.setAttribute("tabindex", 11);    
    console.log(calendarOpener.shadowRoot.querySelector("button"));
    let difficultButton = calendarOpener.shadowRoot.querySelector("button");
    difficultButton.setAttribute("tabindex", 12)
}

logInButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if(validateLogIn(username, password).includes("successful")) {
        loginErrorMessage.style.color = "green";
        loginErrorMessage.innerHTML = validateLogIn(username, password);
        setTimeout(() => {
            renderTravelerDashboard();
            loadPastTrips();
            loadUpcomingTrips();
            loadTripYears();
        }, "2000");
    } else {
        loginErrorMessage.style.color = "red";
        loginErrorMessage.innerHTML = validateLogIn(username, password);
    }
});

requestTripButton.addEventListener("click", () => {
    window.scrollTo({
        behavior: "smooth",
        top: 30
    });
});

yourTripsButton.addEventListener("click", () => {
    window.scrollTo({
        behavior: "smooth",
        top: 862
    });
});

yourSpendingButton.addEventListener("click", () => {
    window.scrollTo({
        behavior: "smooth",
        top: 1700
    });
});

signOutButton.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInTraveler");
    location.reload();
});

destinationSelectButton.addEventListener("click", () => {
    destinationContainer.classList.toggle("hidden");
    destinationCover.classList.toggle("hidden");
    loadDestinations();
});


destinationContainer.addEventListener("click", (event) => {
    if(event.target.id === "targetDestinationButton") {
        tripDestinationInput.value = event.target.parentElement.id;
    }
});

tripRequestForm.addEventListener("submit", handleTripRequest);

confirmTripRequestButton.addEventListener("click", () => {
    postTrip(requestedTrip);
    tripRequestFeedback.style.color = "green";
    tripRequestFeedback.innerHTML = `<strong>Your Trip Request has been completed successfully! Please wait while we update your portal...</strong>`
    setTimeout(() => {
        location.reload();
    }, "2000");
});

yearButtonsSection.addEventListener("click", (event) => {
    if(event.target.classList.contains("year-button")) {
        console.log(event.target.id);
        loadTripsSpending(parseInt(event.target.id));
    }
});

formatShadowDOM();






