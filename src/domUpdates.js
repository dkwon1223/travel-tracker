import { fetchDestinations } from "./apiCalls";
import "./css/styles.scss"
import { validateLogIn } from './login';
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
let loggedInTraveler;
const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
    ],
    plugins: ['RangePlugin']
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
    const destinationsData = fetchDestinations();
    const data = await destinationsData;
    const destinationsObject = data;
    destinationsObject.destinations.forEach((destination) => {
        let card = document.createElement("div")
        card.setAttribute("class", "destination-card");
        card.setAttribute("id", `${destination.id}`);
        card.innerHTML = `<h4>${destination.destination}</h4><br>
                        <img src=${destination.image} alt=${destination.alt}>
                        <button id="targetDestinationButton">Select this Destination</button>`;
        destinationContainer.appendChild(card);
    })
}

destinationContainer.addEventListener("click", (event) => {
    if(event.target.id === "targetDestinationButton") {
        console.log(event.target.parentElement.id);
    }
})







