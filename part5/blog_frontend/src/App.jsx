import { useState, useEffect, useRef } from 'react'
import Banner from './components/Banner'
import Bloglist from './components/Bloglist'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setNotificationMessage('Logout successful')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
    setNotificationMessage(null)
    }, 3000)
}   

  return (
    <div>
      {Banner()}
      <Notification message={errorMessage} isError={true} />
      <Notification message={notificationMessage} isError={false} />
      {!user && LoginForm({ handleLogin, username, password, setUsername, setPassword })}
      {user &&
        <>
        <UserDetails user={user} handleLogout={handleLogout} />
        <Togglable buttonLabel='Add blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <Bloglist blogs={blogs} />
        <Footer />
        </>
      }
      
    </div>
  )
}

export default App