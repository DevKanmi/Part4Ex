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

blogRouter.delete('/:id', async(request, response)=>{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end
})

blogRouter.put('/:id', async(request,response)=>{
    const body = request.body
   const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
   }
    const updatedBlogPost = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
    response. json(updatedBlogPost)
})

blogRouter.get('/:id', async(request,response)=>{
    const reqBlog = await Blog.findById(request.params.id)
    response.json(reqBlog)
})


module.exports = blogRouter




