const UserDetails = ({ user, handleLogout }) => (
  <div>
    <p>Logged in as {user.name} <button onClick={handleLogout}>Log out</button></p>
  </div>
)

export default UserDetails