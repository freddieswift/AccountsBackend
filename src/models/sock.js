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
    dyeCostPerDozen: {
        type: Number,
        defualt: 0
    }
})

const Sock = mongoose.model('Sock', sockSchema)

module.exports = Sock