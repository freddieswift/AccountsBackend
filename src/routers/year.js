const express = require('express')
const Account = require('../models/account')
const Category = require('../models/category')
const Year = require('../models/year')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/year', auth, async (req, res) => {
    const year = new Year(req.body)
    year.accountId = req.account._id
    try {
        await year.save()
        res.status(201).send(year)
    }
    catch (error) {
        res.send(error)
    }
})

//get list of years associated with account
router.get('/year', auth, async (req, res, next) => {
    const accountId = req.account._id
    try {
        const years = await Year.find({
            "accountId": accountId
        })

        const formattedYears = years.map((year) => {
            return {
                _id: year._id,
                year: year.name
            }
        })

        res.send({ years: formattedYears })


    }
    catch (error) {
        next(error)
    }
})

router.delete('/year/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const year = await Year.findOneAndDelete({ _id, accountId: req.account._id })
        if (!year) {
            return res.status(404).send()
        }
        res.send(year)
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, please try again later..." })
    }
})

module.exports = router