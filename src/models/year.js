const mongoose = require('mongoose')
const categorySchema = require('../models/category')

const yearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    turnover: {
        type: Number,
        default: 0,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    categories: [categorySchema]
})

const Year = mongoose.model('Year', yearSchema)

module.exports = Year