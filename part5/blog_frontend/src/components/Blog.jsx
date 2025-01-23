import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateFunction }) => {
  const [expanded, setExpanded] = useState(false)
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const addLike = () => {
    updateFunction(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  return (
      <div className="blog">
        {blog.title} {blog.author} <button onClick={() => toggleExpanded()}>{expanded ? 'hide' : 'view'}</button>
        <div className="blog" style={showWhenExpanded}>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={() => addLike()}>like</button></div>
          <div>{blog.user ? blog.user.name : ''}</div>
        </div>
      </div>
  )  
}

export default Blog