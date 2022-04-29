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
    COSOHPerDozen: {
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

    if (this.predictedDozens != 0) {
        this.COSOHPerDozen = (this.totalCOS + this.totalOH) / this.predictedDozens
    }
    else {
        this.COSOHPerDozen = 0
    }

    await this.save()
}

const Year = mongoose.model('Year', yearSchema)

module.exports = Year