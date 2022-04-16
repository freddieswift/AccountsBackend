const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: true,
        enum: ['COS', 'OVERHEAD']
    },
    value: {
        type: Number,
        default: null
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category