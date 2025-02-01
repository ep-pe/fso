import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateFunction, deleteFunction, username }) => {
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
      <div>
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <button onClick={() => toggleExpanded()}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded && (
        <div className="blog" style={showWhenExpanded} >
          <div>{blog.url}</div>
          <div><span>{blog.likes} likes</span> <button onClick={() => addLike()}>like</button></div>
          <div>{blog.user ? blog.user.name : ''}</div>
          {(username === blog.user.username || username === 'admin') && <button onClick={() => deleteFunction(blog.id)}>Remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog