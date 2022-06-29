import { useEffect, useState } from "react"

const getBookings = async () => {
    try {
        let loadedBookings = [];
        const response = await fetch('https://project1-abcd-f799c-default-rtdb.firebaseio.com/bookings.json');

        const responseData = await response.json();
        if (!response.ok) {
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
        }

        for (const key in responseData) {
            loadedBookings.push({
                id: key,
                user: responseData[key].userEmail,
                event: responseData[key].eventId,
            })
        }
        return loadedBookings;
    }
    catch (error) {
        console.log(error.message);
        return [];
    };


}
export const getBookingList = async (user) => {

    let bookings = await getBookings();
    const specificBookings = bookings.filter(
        (booking) => {
            return booking.user === user
        }
    )

    const specificEventsName = specificBookings.map(
        booking => booking.event
    )
    console.log(specificEventsName);

    return specificEventsName;
}


