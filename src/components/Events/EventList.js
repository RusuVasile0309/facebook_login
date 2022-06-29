import { useEffect, useState } from "react"

const getEvents = async () => {
    try {
        let loadedEvents = [];
        const response = await fetch('https://project1-abcd-f799c-default-rtdb.firebaseio.com/events.json');

        const responseData = await response.json();
        if (!response.ok) {
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
        }

        for (const key in responseData) {
            loadedEvents.push({
                id: key,
                name: responseData[key].name,
                locationId: responseData[key].locationId,
                date: responseData[key].date,
            })
        }
        return loadedEvents;
    }
    catch (error) {
        console.log(error.message);
        return [];
    };


}
export const getEventList = async (id) => {

    let events = await getEvents();
    const specificEvents = events.filter(
        (event) => {
            return event.locationId === id
        }
    )
    console.log(specificEvents);
    const specificEventsName = specificEvents.map(
        event => event.name
    )
    console.log(specificEventsName);

    return specificEventsName;
}


