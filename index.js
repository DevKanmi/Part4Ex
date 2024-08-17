
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

const config = require('./utils/config')
const logger = require('./utils/logger')



mongoose.set('strictQuery', false)


const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)
    .then(()=> logger.info(`connected to ${config.MONGODB_URI}`))

app.get('/api/blogs', (request, response)=>{
    Blog.find({}).then(blogs =>
        {response.json(blogs)})
})

app.post('/api/blogs', (request, response) =>{
    const body = request.body
    const blog = new Blog({
        title : body.title,
        author : body.author,
        url: body.url,
        likes: body.likes
    })

    blog
        .save().then(result =>{
            response.status(201).json(result)
            logger.info("blog1 saved to db");
            
        })
})


app.listen(config.PORT, ()=>{
    logger.info(`server is running on PORT ${config.PORT}`)
})