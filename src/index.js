const express = require('express')
require('./db/mongoose.js')
const yearRouter = require('./routers/year')
const accountRouter = require('./routers/account')
const categoryRouter = require('./routers/category')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const port = process.env.PORT || 3000

//accept json in request body
app.use(express.json())

//set up routers
app.use(yearRouter)
app.use(accountRouter)
app.use(categoryRouter)
app.use(errorHandler)

//start server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})