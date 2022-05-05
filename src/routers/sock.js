const express = require('express')
const Sock = require('../models/sock')
const { generateCustomError } = require('../errors/customError')
const auth = require('../middleware/auth')

const router = new express.Router()

//create sock
router.post('/sock', auth, async (req, res, next) => {
    const sock = new Sock(req.body)
    sock.accountId = req.account._id
    try {
        await sock.save()
        res.status(201).send(sock)
    }
    catch (error) {
        next(error)
    }
})

//get sock by id
router.get('/sock/:id', auth, async (req, res, next) => {
    const accountId = req.account._id
    const sockId = req.params.id

    try {
        const sock = await Sock.findOne({
            _id: sockId,
            accountId
        })

        if (!sock) {
            return next(generateCustomError("No sock found", 404))
        }

        console.log(sock)
        res.send(sock)
    }
    catch (error) {
        next(error)
    }
})
// get all socks

router.get('/sock', auth, async (req, res, next) => {
    const accountId = req.account._id

    try {
        const socks = await Sock.find({
            "accountId": accountId
        })

        res.send({ socks: socks })
    }
    catch (error) {
        next(error)
    }
})
//update sock by id
//delete sock by id

module.exports = router
