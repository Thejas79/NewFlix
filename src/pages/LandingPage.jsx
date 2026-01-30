import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import { authAPI, saveUserData } from '../services/authAPI'

function LandingPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [apiMessage, setApiMessage] = useState('')
    const navigate = useNavigate()

    // Featured movie posters from TMDB
    const featuredPosters = [
        'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', // Oppenheimer
        'https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg', // Barbie
        'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg', // John Wick 4
    ]

    const validateForm = () => {
        const newErrors = {}

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required'
        }

        if (!isLogin && !formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters'
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiMessage('')

        if (!validateForm()) {
            return
        }

        setLoading(true)

        try {
            if (isLogin) {
                // Sign In
                const response = await authAPI.signIn(
                    formData.username,
                    formData.password
                )

                if (response.success) {
                    // Save user data to localStorage
                    saveUserData(response.user)

                    // Call parent onLogin with user data
                    onLogin({
                        username: response.user.username,
                        email: response.user.email
                    })

                    // Show success message
                    setApiMessage(response.message)

                    // Navigate to browse page
                    setTimeout(() => {
                        navigate('/browse')
                    }, 500)
                } else {
                    setApiMessage(response.message)
                    setErrors({ general: response.message })
                }
            } else {
                // Sign Up
                const response = await authAPI.signUp(
                    formData.username,
                    formData.email,
                    formData.password
                )

                if (response.success) {
                    // Save user data to localStorage
                    saveUserData(response.user)

                    // Call parent onLogin with user data
                    onLogin({
                        username: response.user.username,
                        email: response.user.email
                    })

                    // Show success message
                    setApiMessage(response.message)

                    // Navigate to browse page
                    setTimeout(() => {
                        navigate('/browse')
                    }, 500)
                } else {
                    setApiMessage(response.message)
                    setErrors({ general: response.message })
                }
            }
        } catch (error) {
            console.error('Authentication error:', error)
            setApiMessage(error.message || 'Unable to connect to server. Please ensure the backend is running.')
            setErrors({ general: error.message || 'Server connection failed' })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
        }
    }

    return (
        <div className="landing-page">
            {/* Background */}
            <div className="landing-bg">
                <div className="landing-gradient"></div>
            </div>

            {/* Navbar */}
            <nav className="landing-nav">
                <div className="logo">
                    <span className="logo-icon">▶</span>
                    <span className="logo-text">New<span className="accent">Flix</span></span>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Unlimited Movies, TV Shows<br />
                        <span className="gradient-text">& Much More</span>
                    </h1>
                    <p className="hero-subtitle">
                        Watch anywhere. Cancel anytime. Stream in 5 languages.
                    </p>
                    <div className="hero-cta">
                        <button className="btn btn-primary btn-xl" onClick={() => setShowModal(true)}>
                            <span>Get Started</span>
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">Movies</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">5K+</span>
                        <span className="stat-label">TV Shows</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">5</span>
                        <span className="stat-label">Languages</span>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="trending-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="fire-icon">🔥</span> Top Trending
                        </h2>
                        <p className="section-subtitle">Sign in to start watching</p>
                    </div>

                    <div className="trending-grid">
                        {featuredPosters.map((poster, index) => (
                            <div
                                key={index}
                                className="trending-card"
                                onClick={() => setShowModal(true)}
                            >
                                <div className="trending-rank">{index + 1}</div>
                                <img
                                    src={poster}
                                    alt={`Trending ${index + 1}`}
                                    className="trending-poster"
                                />
                                <div className="trending-overlay">
                                    <button className="btn btn-glass btn-sm">
                                        <span>▶</span> Watch Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🌐</div>
                            <h3>5 Languages</h3>
                            <p>English, Hindi, Kannada, Tamil & Telugu</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Watch Anywhere</h3>
                            <p>Stream on any device, anytime</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎬</div>
                            <h3>TMDB Powered</h3>
                            <p>Real movies & TV shows data</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">✨</div>
                            <h3>Premium Quality</h3>
                            <p>HD streaming available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>© 2025 NewFlix. Powered by TMDB | Made with ❤️</p>
            </footer>

            {/* Auth Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="auth-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>×</button>

                        <div className="modal-header">
                            <h2>{isLogin ? 'Welcome Back' : 'Join NewFlix'}</h2>
                            <p>{isLogin ? 'Sign in to continue watching' : 'Create your account'}</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {/* API Message Display */}
                            {apiMessage && (
                                <div className={`api-message ${errors.general ? 'error' : 'success'}`}>
                                    {apiMessage}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    className={errors.username ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.username && <span className="error-msg">{errors.username}</span>}
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={errors.email ? 'error' : ''}
                                        disabled={loading}
                                    />
                                    {errors.email && <span className="error-msg">{errors.email}</span>}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className={errors.password ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.password && <span className="error-msg">{errors.password}</span>}
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className={errors.confirmPassword ? 'error' : ''}
                                        disabled={loading}
                                    />
                                    {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>

                        <div className="auth-switch">
                            {isLogin ? (
                                <p>New to NewFlix? <button onClick={() => setIsLogin(false)}>Sign up now</button></p>
                            ) : (
                                <p>Already have an account? <button onClick={() => setIsLogin(true)}>Sign in</button></p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LandingPage
