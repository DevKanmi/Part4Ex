const express = require('express')
require('express-async-errors')// NO need to use try-except blocks this takes care of error-handlings
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
app.use(cors())
app.use(express.json())

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogRouter = require('./controllers/blogs')
const signUpRouter = require('./controllers/signUp')
const loginRouter = require('./controllers/userLogin')



mongoose.set('strictQuery', false)

logger.info(`Connection to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(()=> logger.info(`successfully connected to MongoDB`))



app.use(middleware.requestLogger)
app.use(middleware.gettokenfrom)

app.use('/api/blogs', blogRouter)
app.use('/api/users',signUpRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app