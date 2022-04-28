const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: true,
        enum: ['COS', 'OVERHEAD', 'OI']
    },
    value: {
        type: Number,
        default: null
    }
})

module.exports = categorySchema