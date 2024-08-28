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

blogRouter.delete('/:id', async(request, response)=>{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end
})

    const savedBlogPost = await blog.save()
    response.status(201).json(savedBlogPost)    
})

module.exports = blogRouter




