const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

const {
    createYear,
    getAllYears,
    getActiveYear,
    getYearByID,
    deleteYear,
    updateYear
} = require('../controllers/year')

router.post('/year', auth, createYear)
router.get('/year', auth, getAllYears)
router.get('/year/active', auth, getActiveYear)
router.get('/year/:id', auth, getYearByID)
router.delete('/year/:id', auth, deleteYear)
router.patch('/year/:id', auth, updateYear)

module.exports = router