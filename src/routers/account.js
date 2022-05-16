const express = require('express')
const auth = require('../middleware/auth')
const { createAccount, login, logout, deleteAccount } = require('../controllers/account')

const router = new express.Router()

router.post('/account', createAccount)
router.delete('/account', auth, deleteAccount)
router.post('/account/login', login)
router.post('/account/logout', auth, logout)

module.exports = router