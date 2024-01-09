const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')

// Routes
const usfRoutes = require('./routes/usfRoutes')
const infirmaryRoutes = require('./routes/infirmaryRoutes')
const users = require('./routes/usersRoutes')

// express app
const app = express()

// listen for requests (PORT)
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// routes
app.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
})
app.use('/users', users)
app.use('/usf', usfRoutes)
app.use('/infirmary', infirmaryRoutes)
