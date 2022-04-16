const express = require('express')
const Category = require('../models/category')
const auth = require('../middleware/auth')

const router = new express.Router()

//create category
router.post('/category', auth, async (req, res) => {
    categoriesArray = req.body

    try {
        const result = await Category.insertMany(categoriesArray)
        res.status(201).send(result)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router