const express = require('express')
const Category = require('../models/category')
const Year = require('../models/year')
const auth = require('../middleware/auth')

const router = new express.Router()

//create category
router.post('/category', auth, async (req, res) => {

    if (req.body instanceof Array == false) {
        return res.status(400).send()
    }

    const categoriesArray = req.body
    const accountId = req.account._id

    for (const category of req.body) {
        category.accountId = accountId
    }

    try {
        const categoryResult = await Category.insertMany(categoriesArray)

        // if year is provided as a parameter
        // update the year with the categories created
        if (req.query.year) {

            const yearResult = await Year.findOne({ _id: req.query.year })

            if (!yearResult) {
                return res.status(404).send({ error: "Unable to find year" })
            }

            for (const category of categoryResult) {
                yearResult.categories.push(category._id)
            }

            await yearResult.save()
        }

        res.status(201).send(categoryResult)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/category/:id', auth, async (req, res) => {
    const categoryId = req.params.id

    try {
        const category = await Category.findOneAndDelete({ _id: categoryId })

        if (!category) {
            return res.status(404).send()
        }

        const year = await Year.findOne({ categories: category._id })

        if (year) {
            const updatedYearCategories = year
        }



        res.send(category)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error: "Something went wrong, please try again later..." })
    }
})

module.exports = router