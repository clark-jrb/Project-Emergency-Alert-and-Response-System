import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/map.css'
import { useRequestContext } from '../context/RequestContext'
import MarkerIcons from '../hooks/buttons/MarkerIcons'
import { useAuth } from '../context/AuthContext'
import { useUsersContext } from '../context/UsersContext'
import { useActiveContext } from '../context/ActiveContext'
import { useNavActiveContext } from '../context/NavActiveContext'
import { useLocateContext } from '../context/LocateContext'

const Map = () => {
    const mapRef = useRef(null);
    const { toLocate } = useLocateContext()
    const { setTheNav } = useNavActiveContext()
    const { setTheActive } = useActiveContext()
    const { admins } = useUsersContext()
    const { currentUserRole } = useAuth()
    const { requests } = useRequestContext()
    const navigate = useNavigate()
    const [toThisLoc, setToThisLoc] = useState([])

    const currentAdmin = admins.find(admin => admin.route === currentUserRole)   
    
    useEffect(() => {
        if (toLocate.length > 0) {
            setToThisLoc(toLocate)
            // console.log(toLocate);
        } 
        // Check if mapRef has been initialized
        if (mapRef.current && toThisLoc.length > 0) {
            mapRef.current.panTo(toThisLoc, 17);
            // console.log(toThisLoc);
        }
    }, [toThisLoc, toLocate]);


    const handleDetailsBtn = (e) => {
        navigate(`/${currentAdmin.route}/emergencies`)
        setTheActive(e)
        setTheNav('emergencies')
    }

    const handleClickCenter = async (e) => {
        // e.originalEvent.preventDefault();
        const markerPosition = e.target.getLatLng();
        const setThePosition = [markerPosition.lat, markerPosition.lng];

        // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${setThePosition[0].toFixed(7)}&lon=${setThePosition[1].toFixed(7)}`);
        // const data = await response.json();

        // if (data && data.display_name) {
        //     const locationName = data.display_name;
        //     console.log('Location Name:', locationName);
        //     // Do something with the location name, e.g., display it in a tooltip or popup.
        // } else {
        //     console.log('Location name not found.');
        // }
        
        mapRef.current.panTo(setThePosition);
        // console.log('possition: ', setThePosition);
    }

    return (
        <MapContainer center={[15.734781, 120.933556]} zoom={16} ref={mapRef}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {requests.length > 0 && requests.filter(request => request.status === 'New' || request.status === 'Ongoing').map(request => (
                <Marker 
                    key={request.id} 
                    position={[request.location.latitude, request.location.longitude]} 
                    icon={MarkerIcons({ level: request.emergency_level, type: request.emergency_type })}
                    eventHandlers={{ click: handleClickCenter }}
                >
                    <Popup autoPan={false}> 
                        <div>
                            <span className={`level-highlight 
                                        ${request.emergency_level === '1' ? 
                                            "blue" : request.emergency_level === '2' ? 
                                            "green" : request.emergency_level === '3' ? 
                                            "yellow" : request.emergency_level === '4' ? 
                                            "red" : "N/A"
                                        }`}>{request.emergency_level === '1' ? 
                                        "NON-URGENT" : request.emergency_level === '2' ? 
                                        "SEMI-URGENT" : request.emergency_level === '3' ? 
                                        "URGENT" : request.emergency_level === '4' ? 
                                        "IMMEDIATE" : "N/A"}
                            </span>

                            <br/>
                            
                            <span className='info-highlight'>
                                {request.emergency_type}
                            </span>
                            
                            <br/>
                            {request.status === 'Ongoing' ? 
                            <>
                                <div className='ongoing-cont py-2 my-2'>
                                    Ongoing
                                </div>
                            </> 
                            : 
                            <>
                                <div className='details-btn-con py-1'>
                                    <button className='see-det-btn w-100 p-2 px-3' onClick={() => handleDetailsBtn(request.id)}>See details</button>
                                </div>
                            </>}
                        </div>
                    </Popup>
                </Marker>
            ))}
            
        </MapContainer>
    )
}

export default React.memo(Map)