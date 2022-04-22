const express = require('express')
const Category = require('../models/category')
const auth = require('../middleware/auth')

const router = new express.Router()

//create category
router.post('/category', auth, async (req, res) => {

    const categoriesArray = req.body
    const accountId = req.account._id

    for (const category of categoriesArray) {
        category.accountId = accountId
    }

    try {
        const result = await Category.insertMany(categoriesArray)
        res.status(201).send(result)
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
        res.send(category)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error: "Something went wrong, please try again later..." })
    }
})

module.exports = router