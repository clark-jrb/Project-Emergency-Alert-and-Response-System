import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import '../styles/map.css'
import { useRequestContext } from '../context/RequestContext'

const Map = () => {
    const { requests } = useRequestContext()

    const L1accident = new Icon({
        iconUrl: require('../images/markers/L1accident.png'),
        iconSize: [69, 69],
        iconAnchor: [32, 59],
        popupAnchor: [3, -50]
    })

    const L1assist = new Icon({
        iconUrl: require('../images/markers/L1assist.png'),
        iconSize: [69, 69],
        iconAnchor: [32, 59],
        popupAnchor: [3, -50]
    })

    const L1violence = new Icon({
        iconUrl: require('../images/markers/L1violence.png'),
        iconSize: [69, 69],
        iconAnchor: [32, 59],
        popupAnchor: [3, -50]
    })

    const L1security = new Icon({
        iconUrl: require('../images/markers/L1security.png'),
        iconSize: [69, 69],
        iconAnchor: [32, 59],
        popupAnchor: [3, -50]
    })

    // console.log(requests[0]);

    return (
        <MapContainer center={[15.735976, 120.931406]} zoom={17}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {requests.filter(request => request.status === 'New').map(request => (
                <Marker key={request.id} position={[request.location.latitude, request.location.longitude]} icon={L1assist}>
                    <Popup>
                        A pop up.
                    </Popup>
                </Marker>
            ))}
            
        </MapContainer>
    )
}

export default Map