const mongoose = require('mongoose')
require('dotenv').config()
const connectionURL = process.env.DATABASE_URL
console.log(connectionURL)

mongoose.connect(connectionURL, {
    useNewURLParser: true
})