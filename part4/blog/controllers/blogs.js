const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

const user = await User.findById('6790c83902ec085d4450bfbf') // hardcoded user id
blog.user = user._id

const savedBlog = await blog.save()
user.blogs = user.blogs.concat(savedBlog._id)
await user.save()
response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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