const express = require('express')
require('dotenv').config()
const port = process.env.PORT

// Routes
const usfRoutes = require('./routes/usfRoutes')
const infirmaryRoutes = require('./routes/infirmaryRoutes')

// express app
const app = express()

// listen for requests (PORT)
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
})

app.use('/usf', usfRoutes)
app.use('/infirmary', infirmaryRoutes)
