import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    },
  }

  const mockHandler = vi.fn()

  beforeEach(() => {
    render(<Blog blog={blog} updateFunction={mockHandler} />)
  })

  test('show render', () => {
    screen.debug()
  })

  test('renders title and author, but not url and likes', () => {
    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.queryByText(blog.url)).toBeNull()
  })

  test('when view button is clicked, url, likes and user are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(blog.user.name)).toBeDefined()
    expect(button).toHaveTextContent('hide')
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
