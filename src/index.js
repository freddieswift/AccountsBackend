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

// app.post('/', async (req, res) => {
//     const account = new Account({
//         name: 'populate',
//         password: 'Password',
//         defaultCategories: ['62580c087639c5d19ddf997f']
//     })

//     try {
//         await account.save()
//         res.send("account saved")
//     }
//     catch (error) {
//         console.log(error)
//         res.status(400).send()
//     }
// })

// app.get('/', async (req, res) => {
//     const account = await Account.findOne({
//         name: 'populate'
//     }).populate('defaultCategories')

//     res.send(account)
// })



// app.get('/year', async (req, res) => {

//     try {
//         const year = await Year.find({
//             "account": "62580cea87cc86be4e004de3"
//         })
//             .populate('categories')
//         res.send(year)
//     }
//     catch (error) {
//         res.send(error)
//     }

// })

// app.get('/category', async (req, res) => {
//     const category = new Category({
//         name: 'test',
//         categoryType: 'COS'
//     })

//     try {
//         const categoryResult = await category.save()
//         res.send(categoryResult)
//     }
//     catch (error) {
//         res.status(400).send()
//     }
// })