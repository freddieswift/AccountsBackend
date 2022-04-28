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
    predictedSocks: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: false
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    categories: [categorySchema],
    totalCOS: {
        type: Number,
        default: 0
    },
    totalOH: {
        type: Number,
        default: 0
    }
})

yearSchema.methods.calculateTotalCOSOH = async function () {
    let totalCOS = 0
    let totalOH = 0
    this.categories.forEach(category => {
        if (category.categoryType === 'COS') {
            totalCOS += category.value
        }
        else {
            totalOH += category.value
        }
    });
    this.totalCOS = totalCOS
    this.totalOH = totalOH

    await this.save()
}

const Year = mongoose.model('Year', yearSchema)

module.exports = Year