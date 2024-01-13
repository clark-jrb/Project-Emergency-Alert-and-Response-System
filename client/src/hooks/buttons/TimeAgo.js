import React, { useEffect, useState } from 'react'
import moment from 'moment'

const TimeAgo = ({ date, time }) => {
    const [timeAgo, setTimeAgo] = useState('')

    useEffect(() => {
        // Combine date and time into a single string
        const dateTimeString = `${date} ${time}`
        // Parse the string into a moment object
        const dateTime = moment(dateTimeString, 'MMMM D, YYYY h:mm A')
        // Calculate the time ago
        const diff = moment().diff(dateTime, 'minutes');
        // Customize the display based on the difference
        let ago = '';
            if (diff >= 1440) {
                ago = `${Math.floor(diff / 1440)}d`;
            } else if (diff >= 60) {
                ago = `${Math.floor(diff / 60)}h`;
            } else {
                ago = `${diff}m`;
            }
        // Update the state with the calculated time ago
        setTimeAgo(ago)
    }, [date, time])

    return <span>{timeAgo}</span>
}

export default TimeAgo