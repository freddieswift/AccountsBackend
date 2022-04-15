const jwt = require('jsonwebtoken')
const Account = require('../models/account')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "freddie")
        const account = await Account.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!account) {
            throw new Error()
        }

        req.account = account
        req.token = token
        next()
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate" })
    }
}

module.exports = auth