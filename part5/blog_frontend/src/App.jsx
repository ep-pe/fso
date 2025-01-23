import { useState, useEffect } from 'react'
import Banner from './components/Banner'
import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import Footer from './components/Footer'
import Notification from './components/Notification'


import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

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

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    await blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotificationMessage(`A new blog ${title} by ${author} added`)
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
        {UserDetails({ user, handleLogout })}
        {Bloglist({ blogs, author, setAuthor, title, setTitle, url, setUrl, createBlog })}
        {Footer()}
        </>
      }
      
    </div>
  )
}

export default App