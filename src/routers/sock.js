const express = require('express')
const Sock = require('../models/sock')
const { generateCustomError } = require('../errors/customError')
const auth = require('../middleware/auth')

const router = new express.Router()

//create sock
router.post('/sock', auth, async (req, res, next) => {
    const sock = new Sock(req.body)
    sock.accountId = req.account._id
    console.log(sock)
    try {
        await sock.save()
        res.status(201).send(sock)
    }
    catch (error) {
        next(error)
    }
})
//get sock by id
//update sock by id
//delete sock by id

module.exports = router
