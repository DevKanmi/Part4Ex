const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')



mongoose.set('strictQuery', false)

logger.info(`Connection to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(()=> logger.info(`successfully connected to ${config.MONGODB_URI}`))




app.use('/api/blogs', blogRouter)

module.exports = app