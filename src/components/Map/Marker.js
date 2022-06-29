import { useState } from 'react';
import { greatPlaceStyle, greatPlaceStyleHover } from './MarkerStyle';
import Pin from '../../images/pin.png'
import Modal from '../UI/Modal/Modal';
const Marker = (props) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div >
            <div><h3>{props.name}</h3></div>
            <img src={Pin} width='42px' height='60px' onMouseOver={() => setShowModal(true)} onMouseOut={() => setShowModal(false)} />
            {showModal &&
                <div style={{ position: 'absolute', top: '130px', padding: '5px', background: 'white', width: '80px' }}>
                    <p></p>
                    <p>lat: ${props.lat}</p>
                    <p>lng: ${props.lng}</p>
                </div>
            }
        </div>
    )
}

export default Marker;