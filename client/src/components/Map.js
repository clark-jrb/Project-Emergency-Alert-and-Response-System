import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import { Icon } from 'leaflet';
import '../styles/map.css'
import { useRequestContext } from '../context/RequestContext'
import MarkerIcons from '../hooks/buttons/MarkerIcons'

const Map = () => {
    const { requests } = useRequestContext()

    return (
        <MapContainer center={[15.735976, 120.931406]} zoom={17}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {requests.filter(request => request.status === 'New').map(request => (
                <Marker key={request.id} position={[request.location.latitude, request.location.longitude]} icon={MarkerIcons({ level: request.emergency_level, type: request.emergency_type })}>
                    <Popup>
                        A pop up.
                    </Popup>
                </Marker>
            ))}
            
        </MapContainer>
    )
}

export default Map