const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/accountsAnalysis'

mongoose.connect(connectionURL, {
    useNewURLParser: true
})