const UserDetails = ({ user, handleLogout }) => (
  <div>
    <p>
      Logged in as {user.name} <button onClick={handleLogout}>Log out</button>
      {user.username === 'admin' && <button onClick={() => 1}>Admin page</button> /* Does nothing yet*/}
    </p>

  </div>
)

export default UserDetails