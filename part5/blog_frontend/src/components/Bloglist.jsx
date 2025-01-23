import Blog from './Blog'

const Bloglist = ({ blogs, author, setAuthor, title, setTitle, url, setUrl, createBlog }) => (
    <div>
        <h2>Blogs</h2>
        <form onSubmit={createBlog}>
            <h3>Create new</h3>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                URL:
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
        <h3>List</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default Bloglist