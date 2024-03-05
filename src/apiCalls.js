function fetchTravelersData() {
    return fetch("http://localhost:3001/api/v1/travelers") 
        .then(response => {
            if(!response.ok) {
                throw new Error("There was a problem retrieving the data. Please try again");
            }
            return response.json();
        })
        .then(data => {
            let travelersData = data;
            return travelersData;
        })
        .catch(error => console.log(error));
}

function fetchTraveler(id) {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
        .then(response => {
            if(!response.ok) {
                throw new Error("There was a problem retrieving the data. Please try again");
            }
            return response.json();
        })
        .then(data => {
            let traveler = data;
            return traveler;
        })
        .catch(error => console.log(error));
}

function fetchDestinations() {
    return fetch('http://localhost:3001/api/v1/destinations')
        .then(response => {
            if(!response.ok) {
                throw new Error("There was a problem retrieving the data. Please try again");
            }
            return response.json();
        })
        .then(data => {
            let destinationsData = data;
            return destinationsData;
        })
        .catch(error => console.log(error));
}

function fetchTrips() {
    return fetch('http://localhost:3001/api/v1/trips')
        .then(response => {
            if(!response.ok) {
                throw new Error("There was a problem retrieving the data. Please try again");
            }
            return response.json();
        })
        .then(data => {
            let tripsData = data;
            return tripsData;
        })
        .catch(error => console.log(error));
}

function postTrip(trip) {
    fetch("http://localhost:3001/api/v1/trips", {
        method: "POST",
        body: JSON.stringify(trip),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("There was an issue adding your trip details. Please try again.")
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

export { fetchTravelersData, fetchTraveler, fetchDestinations, fetchTrips, postTrip }