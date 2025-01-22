const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
const blog = new Blog(request.body)

if(blog.title === undefined || blog.url === undefined) {
  response.status(400).end()
  return
}

const decodedToken = jwt.verify(request.token, process.env.SECRET)
if(!decodedToken.id) {
  return response.status(401).json({ error: 'token missing or invalid' })
}

const user = request.user
blog.user = user._id

const savedBlog = await blog.save()
user.blogs = user.blogs.concat(savedBlog._id)
await user.save()
response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if(!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    
    if(blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }

    response.status(401).json({ error: 'unauthorized' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter