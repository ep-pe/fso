const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('field id is defined', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    console.log(ids)
    ids.forEach(id => {
        assert.notStrictEqual(id, undefined, 'id field is undefined')
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'testblogtitle'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    console.log(response.body)
    assert(contents.includes('testblogtitle'))
})

test('a blog without likes will default to 0', async () => {
    const newBlog = {
        title: 'testblogtitle',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(r => r.title === 'testblogtitle')
    assert.strictEqual(blog.likes, 0)
})

test.only('a blog without title and url will return 400', async () => {
    const newBlog = {
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})