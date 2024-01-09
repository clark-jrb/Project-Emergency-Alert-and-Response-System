const db = require('../config/firebase')

const users = db.collection('users')

const getUsers = async (req, res) => {
    try {
        const snapshot = await users.get()
        const data = snapshot.docs.map(doc => doc.data())

        res.json(data)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getUsers,
}