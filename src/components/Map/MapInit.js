import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { getEventList } from '../Events/EventList'
import { submitBooking } from '../Booking/BookEvent'
import { locationsActions } from "../../store/locationsSlice";
import { getBookingList } from '../Booking/MyBookings';
import Marker from './Marker'

const K_HOVER_DISTANCE = 30;

const MapInit = (props) => {
    const [locations, setLocations] = useState([]);
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [toggleLists, setToggleLists] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showBookingsList, setShowBookingsList] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('https://project1-abcd-f799c-default-rtdb.firebaseio.com/locations.json');
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const loadedLocations = [];

            for (const key in responseData) {
                loadedLocations.push({
                    id: key,
                    name: responseData[key].name,
                    lat: responseData[key].lat,
                    lng: responseData[key].lon,
                })
            }
            setLocations(loadedLocations);
        }
        fetchLocations().catch((error) => {
            console.log(error.message);
        })
    }, [])

    //const dispatch = useDispatch();
    //dispatch(locationsActions.setLocations(locations));
    //
    const { signOut, profileName } = props
    // const mapLocations = useSelector((state) => state.locations.cities);
    // console.log(mapLocations);
    const [zoomChanged, setZoomChanged] = useState(6);
    const defaultProps = {
        center: {
            lat: 30.95,
            lng: 30.33
        },
        zoom: 6,
        places: locations

    };
    const scheduleBookingAppears = (event) => {
        setShowModal(true);
        setSelectedEvent(event)
        //submitBooking(profileName, event);

    }
    const [locationChanged, setLocationChanged] = useState(defaultProps.center);
    const [locationId, setLocationId] = useState();
    const goToMarkerHandler = (coords, id) => {
        setToggleLists(false);
        setZoomChanged(11);
        setLocationChanged(coords);
        setLocationId(id);
        console.log(id);
    }

    useEffect(async () => {
        const eventsLoading = await getEventList(locationId)
        console.log(eventsLoading);
        setEvents(eventsLoading);
        console.log(events);
    }, [locationId]);

    useEffect(async () => {
        const bookingsLoading = await getBookingList(profileName)
        console.log(bookingsLoading);
        setBookings(bookingsLoading);
    }, [showBookingsList]);

    const eventList = events?.map(event => {
        return (<div className='listElem' onClick={scheduleBookingAppears.bind(this, event)} ><h2>{event}</h2></div>)
    })
    const bookingList = bookings.map(booking => {
        return (<div className='listElem' ><h2>{booking}</h2></div>)
    })

    const markers = defaultProps.places
        .map(place => {
            const { id, name, ...coords } = place;
            return (<Marker
                name={name}
                {...coords}
            />
            )
        })

    const backHandler = () => {
        setToggleLists(true);
    }
    const mapList = defaultProps.places
        .map(place => {
            const { id, name, ...coords } = place;
            const loc = coords;
            return <div className='listElem' onClick={() => goToMarkerHandler(loc, id)}><h2>{name}</h2></div>
        })


    const scheduleBookingHandler = (event) => {
        submitBooking(profileName, event);
    }
    const showBookings = () => {
        setShowBookingsList(true);
    }
    const closeBookingList = () => {
        setShowBookingsList(false);
    }
    return (

        <div className='row' style={{ height: '100%', width: '100%' }}>
            {toggleLists && !showBookingsList &&
                <div style={{ height: '100%', width: '25%', justifyContent: 'space-around' }}>
                    <div style={{ width: '100%', alignItems: 'start', justifyContent: 'start', display: 'flex', marginLeft: '20px' }}><h1>{profileName}</h1></div>
                    <ul style={{ maxHeight: 700, overflowY: 'scroll', margin: 10 }} className="loc">{mapList}</ul>
                    <div className='btnSignOut' onClick={signOut}><h3>Sign Out</h3></div>
                    <div className='btnSignOut' onClick={showBookings}><h3>My Bookings</h3></div>

                </div>}
            {!toggleLists && !showBookingsList &&
                <div style={{ height: '100%', width: '25%' }}>
                    <div style={{ width: '100%', alignItems: 'start', justifyContent: 'start', display: 'flex', marginLeft: '20px' }}><h1>Event List</h1></div>
                    <ul style={{ maxHeight: 700, overflowY: 'scroll', margin: 10 }} className="loc">{eventList}</ul>
                    <div className='btnSignOut' onClick={backHandler}><h3>Back</h3></div>

                </div>}
            {showBookingsList &&
                <div style={{ height: '100%', width: '25%' }}>
                    <div style={{ width: '100%', alignItems: 'start', justifyContent: 'start', display: 'flex', marginLeft: '20px' }}><h1>My Bookings</h1></div>
                    <ul style={{ maxHeight: 700, overflowY: 'scroll', margin: 10 }} className="loc">{bookingList}</ul>
                    <div className='btnSignOut' onClick={closeBookingList}><h3>Back</h3></div>

                </div>
            }

            <div style={{ height: '100%', width: '75%' }}>
                {locationChanged &&
                    <GoogleMap
                        bootstrapURLKeys={{ key: 'AIzaSyBx8m2S2SwRyWWqNJ5C-C_yHbZRJhla4s4' }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        hoverDistance={K_HOVER_DISTANCE}
                        center={locationChanged}
                        zoom={zoomChanged}
                    >
                        {markers}
                    </GoogleMap>
                }
            </div>
            {showModal &&
                <div style={{ position: 'absolute', top: '0px', padding: '5px', width: '80px', left: '600px' }}>
                    <div>
                        <button
                            className='btnSignOut'
                            onClick={scheduleBookingHandler.bind(this, selectedEvent)}>
                            Book
                        </button>
                        <button
                            className='btnSignOut'
                            onClick={() => { setShowModal(false) }}>
                            Don't Book
                        </button>
                    </div>
                </div>}


        </div >
    );
}

export default MapInit;