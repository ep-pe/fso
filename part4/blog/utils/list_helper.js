const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes > item.likes ? max : item
    }

    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
    const author = lodash.countBy(blogs, 'author')
    return blogs.length === 0
        ? {}
        : lodash.maxBy(Object.keys(author), (o) => author[o])
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}