import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('newflix_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('newflix_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('newflix_user')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/browse" replace /> : <LandingPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/browse"
        element={
          user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  )
}

export default App
