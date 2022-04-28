const { CustomError } = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err instanceof CustomError) {
        return res.status(err.code).send({ error: err.message })
    }

    res.status(500).send({ error: "Something went wrong, please try again later..." })
}

module.exports = errorHandler


// const errorHandler = (err, req, res, next) => {
//     console.log("helloo", err)

//     const defaultError = {
//         statusCode: 500,
//         message: 'Something went wrong. Please try again later...'
//     }

//     if (err.name === "ValidationError") {
//         defaultError.statusCode = 400
//         defaultError.message = Object.keys(err.errors)
//             .map((item) => { return `${item} is required` })
//             .join(', ')
//     }

//     if (err.code && err.code === 11000) {
//         if (Object.keys(err.keyValue) == "username") {
//             defaultError.statusCode = 400
//             defaultError.message = 'This username is not available. Please try again!'
//         }
//     }

//     //res.status(defaultError.statusCode).send({ error: defaultError.message })
//     res.status(defaultError.statusCode).send({ error: err })
// }

// module.exports = errorHandler