const mongoose = require('mongoose')
const { categorySchema } = require('../models/category')

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
    predictedDozens: {
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
    },
    totalOI: {
        type: Number,
        default: 0
    },
    COSOHOIPerDozen: {
        type: Number,
        default: 0
    }
})

yearSchema.methods.calculateTotalCOSOHOI = async function () {
    let totalCOS = 0
    let totalOH = 0
    let totalOI = 0
    this.categories.forEach(category => {
        if (category.categoryType === 'COS') {
            totalCOS += category.value
        }
        else if (category.categoryType === 'OH') {
            totalOH += category.value
        }
        else {
            totalOI += category.value
        }
    });

    this.totalCOS = totalCOS
    this.totalOH = totalOH
    this.totalOI = totalOI

    if (this.predictedDozens != 0) {
        this.COSOHOIPerDozen = (this.totalCOS + this.totalOH - this.totalOI) / this.predictedDozens
    }
    else {
        this.COSOHOIPerDozen = 0
    }

    await this.save()
}

const Year = mongoose.model('Year', yearSchema)

module.exports = Year