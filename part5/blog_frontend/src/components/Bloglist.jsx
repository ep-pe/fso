import Blog from './Blog'

const Bloglist = ({ blogs }) => (
    <div>
        <h2>Blogs</h2>
        <h3>List</h3>
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    </div>
)

export default Bloglist