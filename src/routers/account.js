const express = require('express')
const Account = require('../models/account')
const { generateCustomError } = require('../errors/customError')
const auth = require('../middleware/auth')
const router = new express.Router()

//create account
router.post('/account', async (req, res, next) => {
    const account = new Account(req.body)
    try {
        await account.save()
        const token = await account.generateAuthToken()
        res.status(201).send({ account, token })
    }
    catch (error) {
        next(error)
    }
})

router.post('/account/login', async (req, res, next) => {
    const { username, password } = req.body

    try {
        const account = await Account.findOne({ username })

        if (!account || password !== account.password) {
            return next(generateCustomError("Invalid credentials", 400))
        }

        const token = await account.generateAuthToken()

        res.status(200).send({ token })
    }
    catch (error) {
        next(error)
    }
})

router.post('/account/logout', auth, async (req, res, next) => {
    const currentToken = req.token
    const account = req.account
    try {
        const updatedTokens = []
        account.tokens.forEach(token => {
            if (token.token !== currentToken) {
                updatedTokens.push(token)
            }
        })
        account.tokens = updatedTokens
        await account.save()
        res.send()
    }
    catch (error) {
        res.next(error)
    }
})

module.exports = router