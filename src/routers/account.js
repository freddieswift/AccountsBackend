const express = require('express')
const Account = require('../models/account')

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
            return res.status(400).send({ error: "Invalid credentials" })
        }

        const token = await account.generateAuthToken()

        res.status(200).send({ token })
    }
    catch (error) {
        next(error)
    }
})

router.post('/account/logout', async (req, res) => {

})

module.exports = router