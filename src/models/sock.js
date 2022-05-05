const mongoose = require('mongoose')

const sockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    yarnCostPerDozen: {
        type: Number,
        default: 0
    },
    dyePerDozen: {
        type: Number,
        default: 0
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
})

const Sock = mongoose.model('Sock', sockSchema)

module.exports = Sock