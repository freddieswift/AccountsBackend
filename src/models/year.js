const mongoose = require('mongoose')

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
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
})

const Year = mongoose.model('Year', yearSchema)

module.exports = Year