const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await helper.addInitialUser()
})

describe('getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('field id is defined', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    ids.forEach(id => {
      assert.notStrictEqual(id, undefined, 'id field is undefined')
    })
  })
})

describe('adding blogs', () => {
  test('a valid blog can be added', async () => {
    const auth = await helper.getAuthorization(api)
        
    await api
      .post('/api/blogs')
      .set('Authorization', auth)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
        
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(contents.includes('testblogtitle'))
  })

  test('a blog without likes will default to 0', async () => {
    const auth = await helper.getAuthorization(api)

    await api
      .post('/api/blogs')
      .set({ Authorization: auth })
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(r => r.title === 'testblogtitle')
    assert.strictEqual(blog.likes, 0)
  })

  test('a blog without title and url will return 400', async () => {
    const newBlog = {
    }
    const auth = await helper.getAuthorization(api)

    await api
      .post('/api/blogs')
      .set({ Authorization: auth })
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting and updating blogs', () => {
  test('a blog can be deleted', async () => {
    const auth = await helper.getAuthorization(api)
    const newBlog = await api.post('/api/blogs').set({ Authorization: auth }).send(helper.newBlog)

    await api
      .delete(`/api/blogs/${newBlog.body.id}`)
      .set({ Authorization: auth })
      .expect(204)
        
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog can be updated', async () => {
    const auth = await helper.getAuthorization(api)
    const blogToUpdate = await api.post('/api/blogs').set({ Authorization: auth }).send(helper.newBlog)
    const updatedBlog = {
      likes: 1000
    }

    await api
      .put(`/api/blogs/${blogToUpdate.body.id}`)
      .set({ Authorization: auth })
      .send(updatedBlog)
      .expect(200)
        
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.body.id)
    assert.strictEqual(updatedBlogInDb.likes, 1000)
    assert.strictEqual(updatedBlogInDb.title, blogToUpdate.body.title)
  })
})

after(async () => {
  await mongoose.connection.close()
})