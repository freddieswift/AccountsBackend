const express = require('express')
const cors = require('cors')
require('./db/mongoose.js')

const yearRouter = require('./routers/year')
const accountRouter = require('./routers/account')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const port = process.env.PORT || 3000

//accept json in request body
app.use(express.json())


app.use(cors())

//set up routers
app.use(yearRouter)
app.use(accountRouter)
app.use(errorHandler)

//start server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})