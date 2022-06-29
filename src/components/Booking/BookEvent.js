export const submitBooking = async (email, event) => {
    await fetch('https://project1-abcd-f799c-default-rtdb.firebaseio.com/bookings.json', {
        method: 'POST',
        body: JSON.stringify({
            eventId: event,
            userEmail: email,
        })
    })
}