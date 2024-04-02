
const sendNotification = () => {
    const sendNotif = async (notifData) => {
        try {
            const response = await fetch('https://project-ears-server.onrender.com/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notifData),
            });
            if (!response.ok) {
                throw new Error('Failed to send notification to server');
            }
            console.log('Notification sent to server successfully');
        }
        catch (error) {
            console.error('Error sending notif:', error.message)
        }
    }

    return { 
        sendNotif 
    }
}

export default sendNotification