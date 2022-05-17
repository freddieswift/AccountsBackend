const express = require('express')
const auth = require('../middleware/auth')
const { createSock, getSockByID, getSocks, updateSock, deleteSock } = require('../controllers/sock')

const router = new express.Router()

router.post('/sock', auth, createSock)
router.get('/sock/:id', auth, getSockByID)
router.get('/sock', auth, getSocks)
router.patch('/sock/:id', auth, updateSock)
router.delete('/sock/:id', auth, deleteSock)

module.exports = router
