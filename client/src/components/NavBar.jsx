import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
      
      <div>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: 'black' }}>
          Traitordle
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {user ? (
          <>
            <span>{user.username}</span>
            <span>Streak: {user.streak}</span>
            <Link to="/profile">Profile</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

    </div>
  )
}