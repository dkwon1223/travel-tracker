import "./css/styles.scss"
import { validateLogIn } from './login';

const loginPage = document.querySelector(".login-page");
const logInButton = document.querySelector("#logInButton");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const loginErrorMessage = document.querySelector(".login-error-message");

logInButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if(validateLogIn(username, password).includes("successful")) {
        loginErrorMessage.style.color = "green";
        loginErrorMessage.innerHTML = validateLogIn(username, password);
        setTimeout(() => {
            loginPage.classList.add("hidden");
        }, "3000");
    } else {
        loginErrorMessage.style.color = "red";
        loginErrorMessage.innerHTML = validateLogIn(username, password);
    }
})

