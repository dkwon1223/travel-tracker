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

export { createTrip }