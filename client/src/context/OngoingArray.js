import React, { createContext, useContext } from 'react'
import { useUsersContext } from './UsersContext'
import { useAuth } from './AuthContext'
import { useRequestContext } from './RequestContext'

const OngoingArray = createContext()

export const OngoingArrayProvider = ({ children }) => {
    const { requests } = useRequestContext()
    const { currentUser } = useAuth()
    const { admins } = useUsersContext()
    let ongoingArray = []

    const ongoingRequests = requests.filter(request => request.status === 'Ongoing');
    const findAdmin = admins.find(admin => admin.email === currentUser.email)
    const maxSlots = findAdmin.available;

    function addToOngoingArray(element) {
        if (ongoingArray.length < maxSlots) {
            ongoingArray = [...ongoingArray, element];
            // console.log(`Added request: ${element}`);
        } else {
            console.log('Maximum slots reached. Cannot add more request.');
        }
    }

    ongoingRequests.forEach(request => {
        if (!ongoingArray.some(existingRequest => existingRequest.id === request.id)) {
        addToOngoingArray(request);
    }});

    // const addToTheOngoingArray = (e) => {
    //     addToOngoingArray(e)
    // }

    // console.log(ongoingArray.length);

    return (
    <OngoingArray.Provider value={{ maxSlots, ongoingArray }}>
        {children}
    </OngoingArray.Provider>
    )
}

export const useOngoingArray = () => {
    return useContext(OngoingArray)
}
