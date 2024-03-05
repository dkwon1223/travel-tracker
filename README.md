# Travel Tracker
An application simulating the client side of a travel agency site.

## Background/About
This project implements the fetch API to perform network requests like GET and POST to a local server API. The user experience simulates a traveler visiting a travel agency portal navigating the UI through login credentials, trip requests, past trip views, and past trip spending views. 

## APIs Used
- [Local Travel Tracker API](htts://github.com/turingschool-examples/travel-tracker-api)

## Technologies Used
- Webpack
- HTML
- CSS
- JavaScript
- Mocha & Chai
- [Boxicons](https://boxicons.com/)

## Next Steps
Additional improvements/iterations could include:
- Traveler Dashboard
  - A countdown until the next upcoming trip
  - The ability to perform DELETE requests through the UI in order to cancel a trip
- Travel Agent Dashboard
  - A whole separate dashboard for agents
  - Separate login credentials
  - Ability to add suggested activities for destinations
  - Ability to add new destinations
  - Ability to approve/deny pending trip requests
  - User View: Total Revenue made from 10% agent fee

## GIFs
### Log In
![login](https://github.com/dkwon1223/travel-tracker/assets/112133897/4866688f-da2b-4232-94cb-055b3e6f6814)
### Navigating Page
![nav2](https://github.com/dkwon1223/travel-tracker/assets/112133897/c4b92e36-52d5-462e-8101-67a4226711dd)
### Interactive Features
![features](https://github.com/dkwon1223/travel-tracker/assets/112133897/d99f29e6-3f6f-40af-8301-6fe4259989ae)

## Set Up
Project Build
  1. Fork and clone this repository
  2. Navigate into project root directory
  3. Run `npm install` to install project dependencies
  4. Run `npm start` to start the server
  5. Navigate to the address provided (localhost:8080)

Local API Server(Run in separate terminal tab)
  1. Clone this [repository](https://github.com/turingschool-examples/travel-tracker-api)
  2. Navigate into repository directory
  3. Run `npm install`
  4. Run `npm start`

## Test Driven Development
Application uses Mocha Testing Framework and Chai Assertion Library
- run `npm test` to run tests located in tests directory
