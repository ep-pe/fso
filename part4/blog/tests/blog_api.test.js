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

test.only('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('field id is defined', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    console.log(ids)
    ids.forEach(id => {
        assert.notStrictEqual(id, undefined, 'id field is undefined')
    })
})


after(async () => {
    await mongoose.connection.close()
})