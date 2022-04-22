const express = require('express')
const Year = require('../models/year')
const auth = require('../middleware/auth')
const { findOne } = require('../models/category')
const Category = require('../models/category')

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

router.get('/year/:id', auth, async (req, res, next) => {
    const accountId = req.account._id
    const yearId = req.params.id
    try {
        const year = await Year.findOne({
            accountId,
            _id: yearId
        })
            .populate('categories')

        if (!year) {
            return res.status(404).send({ error: "Cannot find year" })
        }
        res.send(year)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/year/:id', auth, async (req, res) => {
    const yearId = req.params.id
    const accountId = req.account._id
    try {
        const year = await Year.findOneAndDelete({ _id: yearId, accountId: accountId })
        if (!year) {
            return res.status(404).send()
        }
        res.send(year)
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, please try again later..." })
    }
})

router.patch('/year/:id', auth, async (req, res) => {
    const yearId = req.params.id

    const updates = Object.keys(req.body)
    let allowedUpdates = Object.keys(Year.schema.paths)
    allowedUpdates = allowedUpdates.filter(item => item != '_id')

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {
        const year = await Year.findOne({ _id: yearId })

        if (!year) {
            return res.status(404).send({ error: "Cannot find year" })
        }

        for (const category of req.body['categories']) {
            const foundCategory = await Category.findOne({ _id: category })
            if (!foundCategory) {
                return (res.status(404).send({ error: "Unable to create category against year. Please save the category first" }))
            }
        }

        updates.forEach((update) => {
            year[update] = req.body[update]
        })

        await year.save()

        res.send()
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router