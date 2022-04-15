const mongoose = require('mongoose')
const Category = require('./category')
const jwt = require('jsonwebtoken')

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    defaultCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

accountSchema.methods.generateAuthToken = async function () {
    try {
        const account = this
        const token = jwt.sign({ _id: account._id.toString() }, "freddie")
        account.tokens = account.tokens.concat({ token })
        await account.save()
        return token
    }
    catch (error) {
        console.log(error)
    }
}

const Account = mongoose.model('Account', accountSchema)

module.exports = Account