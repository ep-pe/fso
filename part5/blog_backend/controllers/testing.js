const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('blogs and users cleared for testing purposes')
  response.status(204).end()
})

module.exports = router