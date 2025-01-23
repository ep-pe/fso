const UserDetails = ({ user, handleLogout }) => (
    <div>
      <p style={{fontStyle: 'italic'}}>Logged in as {user.name} <button onClick={handleLogout}>Log out</button></p>
    </div>
)

export default UserDetails