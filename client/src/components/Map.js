import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import '../styles/map.css'

const Map = () => {
    const customIcon = new Icon({
        iconUrl: require('../images/markers/marker-location1.png'),
        iconSize: [38, 38],
        iconAnchor: [12, 39],
        shadowUrl: require('../images/markers/shadow.png'),
        shadowSize: [15, 8],
        shadowAnchor: [0.3, 5]
    })

    return (
        <MapContainer center={[15.735976, 120.931406]} zoom={17}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[15.735718, 120.931453]} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map