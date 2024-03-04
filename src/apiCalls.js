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


export { fetchTravelersData, fetchTraveler, fetchDestinations }