import { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
      <div className="blog">
        {blog.title} {blog.author} <button onClick={() => toggleExpanded()}>{expanded ? 'hide' : 'view'}</button>
        <div className="blog" style={showWhenExpanded}>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button>like</button></div>
          <div>{blog.user ? blog.user.name : ''}</div>
        </div>
      </div>
  )  
}

export default Blog