require('dotenv').config()
const express = require('express')
const { admin } = require('./database/firebase-admin');
const cors = require('cors')

// const messagingInstance = firebaseApp.messaging();
// express app
const app = express()

// listen for requests 
app.listen(process.env.PORT, () => {
    console.log("Listening to port:", process.env.PORT)
})

// Middleware
app.use(express.static('public')) 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({msg: 'Welcome'})
})

// send notification

app.post('/send-notification', async (req, res) => {
    try {
        // const { deviceToken } = req.body; // Assuming the FCM token is sent from the client
        const notifData = req.body

        const payload = {
            notification: {
                title: notifData.title,
                body: notifData.body,
            },
        };

        const deviceToken = 'chxf8IieRhyoqXt9eCvTDl:APA91bFpcFQP3j9Pa9BMVWH7NtbbdleIRU8behUuiCELyK-vkuLIA5TWAEugQshqDlgyAravK7BCfktF1UTAU0v6Cu2Be9TOib1XvxxaP-yNkoIvlzal-qv1ZuToWDhDotB0VaRCxVWS'

        await admin.messaging().sendToDevice(deviceToken, payload);

        console.log('Notification sent successfully to device:', deviceToken);
        res.status(200).send('Notification sent successfully');

    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Failed to send notification');
    }
});