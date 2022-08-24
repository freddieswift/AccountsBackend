const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: true,
        enum: ['COS', 'OH', 'OI']
    },
    value: {
        type: Number,
        default: 0
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = { categorySchema, Category }