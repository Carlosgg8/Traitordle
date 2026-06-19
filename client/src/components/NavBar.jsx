import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"
import HowToPlay from "./HowtoPlay.jsx"

export default function NavBar() {
  const { user, logout } = useAuth()
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  return (
    <>
      <div className="navbar">
        <div>
          <Link to="/" className="navbar-logo">
            Traitordle
          </Link>
        </div>

        <div className="navbar-links">
          <button className="navbar-howto" onClick={() => setShowHowToPlay(true)}>
            How to Play
          </button>
          {user ? (
            <>
              <span className="navbar-username">{user.username}</span>
              <span className="navbar-streak">Streak: {user.streak}</span>
              <Link to="/profile">Profile</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <button className="navbar-logout" onClick={logout}>Logout</button>
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
      {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
    </>
  )
}