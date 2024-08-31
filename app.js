const express = require('express')
require('express-async-errors')// NO need to use try-except blocks this takes care of error-handlings
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const signUpRouter = require('./controllers/signUp')



mongoose.set('strictQuery', false)

logger.info(`Connection to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(()=> logger.info(`successfully connected to MongoDB`))




app.use('/api/blogs', blogRouter)
app.use('/api/users',signUpRouter)

module.exports = app