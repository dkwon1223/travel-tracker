import { fetchDestinations } from "./apiCalls";
const destinationsData = fetchDestinations();
const data = await destinationsData;
const destinations = data.destinations;

function createTrip(tripID, userID, destinationID, travelerCount, date, duration) {
 return {
    id: tripID,
    userID: userID,
    destinationID: destinationID,
    travelers: travelerCount,
    date: date,
    duration: duration,
    status: "pending",
    suggestedActivities: []
 }
}

function getTripCost(trip) {
   const targetDestination = destinations.find((destination) => {
      return destination.id === trip.destinationID;
   })
   return {
      destination: `${targetDestination.destination}`,
      flightCost: (trip.travelers * targetDestination.estimatedFlightCostPerPerson),
      lodgingCost: (trip.travelers * (targetDestination.estimatedLodgingCostPerDay * trip.duration)),
      tripCost: ((trip.travelers * targetDestination.estimatedFlightCostPerPerson) + (trip.travelers * (targetDestination.estimatedLodgingCostPerDay * trip.duration))),
      agentFee: Math.round(((trip.travelers * targetDestination.estimatedFlightCostPerPerson) + (trip.travelers * (targetDestination.estimatedLodgingCostPerDay * trip.duration))) * 0.1),
      totalCost: Math.round(((trip.travelers * targetDestination.estimatedFlightCostPerPerson) + (trip.travelers * (targetDestination.estimatedLodgingCostPerDay * trip.duration))) * 1.1)
   }
}



export { destinations, createTrip, getTripCost }