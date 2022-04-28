const mongoose = require('mongoose')
require('dotenv').config()
const connectionURL = process.env.DATABASE_URL

mongoose.connect(connectionURL, {
    useNewURLParser: true
})