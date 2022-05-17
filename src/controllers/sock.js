const Sock = require('../models/sock')
const { generateCustomError } = require('../errors/customError')


const createSock = async (req, res, next) => {
    const sock = new Sock(req.body)
    sock.accountId = req.account._id
    try {
        await sock.save()
        res.status(201).send(sock)
    }
    catch (error) {
        next(error)
    }
}

const getSockByID = async (req, res, next) => {
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
        res.send(sock)
    }
    catch (error) {
        next(error)
    }
}

const getSocks = async (req, res, next) => {
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
}

const updateSock = async (req, res, next) => {
    const sockId = req.params.id
    const accountId = req.account._id

    const updates = Object.keys(req.body)
    let allowedUpdates = Object.keys(Sock.schema.paths)

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return next(generateCustomError("Invalid updates", 400))
    }

    try {
        const sock = await Sock.findOne({ _id: sockId, accountId })

        if (!sock) {
            return next(generateCustomError("Cannot find sock", 404))
        }

        updates.forEach((update) => {
            sock[update] = req.body[update]
        })

        await sock.save()

        res.send(sock)
    }
    catch (error) {
        next(error)
    }
}

const deleteSock = async (req, res, next) => {
    const accountId = req.account._id
    const sockId = req.params.id
    try {
        const sock = await Sock.findOneAndDelete({ _id: sockId, accountId })
        if (!sock) {
            return next(generateCustomError("Cannot find sock", 404))
        }
        res.send(sock)
    }
    catch (error) {
        next(error)
    }
}

module.exports = { createSock, getSockByID, getSocks, updateSock, deleteSock }