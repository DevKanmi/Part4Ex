const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/signUpSchema')
const jwt = require('jsonwebtoken')
const { gettokenfrom } = require('../utils/middleware')


blogRouter.get('/', async(request, response)=>{
    const blogs = await Blog.find({}).populate('user', {username : 1, name : 1})
    response.json(blogs)
} )



blogRouter.post('/', async (request, response) =>{
    const body = request.body
    console.log(body.userId)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const user = await User.findById(decodedToken.id)
    //Retrieve all Users from the db
    const blog = new Blog({
        title : body.title,
        author : body.author,
        url: body.url,
        likes: body.likes,
        user:user.id
        
    })
    const savedBlogPost = await blog.save()
    user.blogs = user.blogs.concat(savedBlogPost._id) // Stores the blog in the blog array we created in the User Schema
    await user.save()
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
    response.json(updatedBlogPost)
})

blogRouter.get('/:id', async(request,response)=>{
    const reqBlog = await Blog.findById(request.params.id)
    response.json(reqBlog)
})


module.exports = blogRouter




