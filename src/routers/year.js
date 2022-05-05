const express = require('express')
const Year = require('../models/year')
const auth = require('../middleware/auth')
const { generateCustomError } = require('../errors/customError')
const router = new express.Router()

router.post('/year', auth, async (req, res, next) => {
    const year = new Year(req.body)
    year.accountId = req.account._id
    try {
        await year.save()
        res.status(201).send(year)
    }
    catch (error) {
        next(error)
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

router.get('/year/active', auth, async (req, res, next) => {
    const accountId = req.account._id

    try {
        const year = await Year.findOne({
            accountId,
            active: true
        })

        if (!year) {
            return next(generateCustomError("No active year found", 404))
        }

        res.send(year)
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
            return next(generateCustomError("Year does not exist", 404))
        }

        res.send(year)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/year/:id', auth, async (req, res, next) => {
    const yearId = req.params.id
    const accountId = req.account._id
    try {
        const year = await Year.findOneAndDelete({ _id: yearId, accountId: accountId })
        if (!year) {
            return next(generateCustomError("Year does not exist", 404))
        }
        res.send(year)
    }
    catch (error) {
        next(error)
    }
})

router.patch('/year/:id', auth, async (req, res, next) => {
    const yearId = req.params.id

    const updates = Object.keys(req.body)
    let allowedUpdates = Object.keys(Year.schema.paths)
    allowedUpdates = allowedUpdates.filter(item != 'totalCOS' && item != 'totalOH')

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return next(generateCustomError("Invalid updates", 400))
    }

    try {

        // if the user is updating the year to be active, check if there is already an active year
        // cannot be 2 active years
        if (req.body.active === true) {
            const activeYear = await Year.findOne({ active: true })
            if (activeYear && activeYear._id != yearId) {
                return next(generateCustomError("Unable to set year as active year. Only one year can be active", 400))
            }
        }

        const year = await Year.findOne({ _id: yearId })

        if (!year) {
            return next(generateCustomError("Cannot find year", 404))
        }

        updates.forEach((update) => {
            year[update] = req.body[update]
        })

        await year.save()

        await year.calculateTotalCOSOH()

        res.send(year)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router