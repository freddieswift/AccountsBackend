const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    categoryType: {
        type: String,
        require: true,
        enum: ['COS', 'OVERHEAD']
    },
    value: {
        type: Number,
        default: null
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category