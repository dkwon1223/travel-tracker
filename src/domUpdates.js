import "./css/styles.scss"
import { validateLogIn } from './login';

const loginPage = document.querySelector(".login-page");
const logInButton = document.querySelector("#logInButton");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginErrorMessage = document.querySelector(".login-error-message");

const travelerDashboard = document.querySelector(".traveler-dashboard");
const userHeader = document.querySelector(".nav-user-info");
const signOutButton = document.querySelector("#signOutButton");
const destinationButton = document.querySelector("#destinationSelectButton");
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

destinationButton.addEventListener("click", () => {
    destinationContainer.classList.remove("hidden");
    destinationCover.classList.add("hidden");
})






