const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogRouter.get('/', async(request, response)=>{
    const blogs = await Blog.find({})
    response.json(blogs)
} )

blogRouter.post('/', async (request, response) =>{
    const body = request.body
    const blog = new Blog({
        title : body.title,
        author : body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlogPost = await blog.save()
    response.status(201).json(savedBlogPost)    
})

module.exports = blogRouter




