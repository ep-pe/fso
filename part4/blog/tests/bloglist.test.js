const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const mongoose = require('mongoose')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(helper.listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(helper.initialBlogs)
        assert.strictEqual(result, 36)
    })

})

describe('favorite blog', () => {
    test('of empty list is empty', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, {})
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favoriteBlog(helper.listWithOneBlog)
        assert.deepStrictEqual(result, helper.listWithOneBlog[0])
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(helper.initialBlogs)
        assert.deepStrictEqual(result, helper.initialBlogs[2])
    })
})

describe('most blogs', () => {
    test('of empty list is empty', () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, {})
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.mostBlogs(helper.listWithOneBlog)
        assert.deepStrictEqual(result, helper.listWithOneBlog[0].author)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(helper.initialBlogs)
        assert.deepStrictEqual(result, 'Robert C. Martin')
    })
})

describe('most likes', () => {
    test('of empty list is empty', () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, {})
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.mostLikes(helper.listWithOneBlog)
        assert.deepStrictEqual(result, helper.listWithOneBlog[0].author)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(helper.initialBlogs)
        assert.deepStrictEqual(result, 'Edsger W. Dijkstra')
    })
})

after(async () => {
    await mongoose.connection.close()
})