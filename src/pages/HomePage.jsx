import { useState, useEffect } from 'react'
import {
    fetchTrendingMovies,
    fetchPopularMovies,
    fetchPopularSeries,
    fetchMoviesByLanguage,
    fetchSeriesByLanguage,
    getImageUrl,
    BACKDROP_SIZE,
    getLanguageName
} from '../services/tmdb'
import ContentCard from '../components/ContentCard'
import WatchModal from '../components/WatchModal'
import './HomePage.css'

const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' }
]

function HomePage({ user, onLogout }) {
    const [movieFilter, setMovieFilter] = useState('all')
    const [seriesFilter, setSeriesFilter] = useState('all')
    const [selectedContent, setSelectedContent] = useState(null)
    const [isScrolled, setIsScrolled] = useState(false)

    // Data states
    const [featuredMovie, setFeaturedMovie] = useState(null)
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [trendingData, moviesData, seriesData] = await Promise.all([
                    fetchTrendingMovies(),
                    fetchPopularMovies(),
                    fetchPopularSeries()
                ])

                // Set featured movie from trending
                if (trendingData.length > 0) {
                    setFeaturedMovie(trendingData[0])
                }

                setMovies(moviesData)
                setSeries(seriesData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Fetch movies when language filter changes
    useEffect(() => {
        const fetchFilteredMovies = async () => {
            if (movieFilter === 'all') {
                const data = await fetchPopularMovies()
                setMovies(data)
            } else {
                const data = await fetchMoviesByLanguage(movieFilter)
                setMovies(data)
            }
        }
        fetchFilteredMovies()
    }, [movieFilter])

    // Fetch series when language filter changes
    useEffect(() => {
        const fetchFilteredSeries = async () => {
            if (seriesFilter === 'all') {
                const data = await fetchPopularSeries()
                setSeries(data)
            } else {
                const data = await fetchSeriesByLanguage(seriesFilter)
                setSeries(data)
            }
        }
        fetchFilteredSeries()
    }, [seriesFilter])

    // Handle scroll for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Loading amazing content...</p>
            </div>
        )
    }

    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-left">
                    <div className="logo">
                        <span className="logo-icon">▶</span>
                        <span className="logo-text">New<span className="accent">Flix</span></span>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#hero" className="active">Home</a></li>
                        <li><a href="#movies">Movies</a></li>
                        <li><a href="#series">Series</a></li>
                    </ul>
                </div>
                <div className="nav-right">
                    <div className="user-info">
                        <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                        <span className="user-name">Hi, <strong>{user.username}</strong></span>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={onLogout}>
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            {featuredMovie && (
                <section className="hero" id="hero">
                    <div
                        className="hero-bg"
                        style={{ backgroundImage: `url(${getImageUrl(featuredMovie.backdrop_path, BACKDROP_SIZE)})` }}
                    >
                        <div className="hero-gradient"></div>
                    </div>
                    <div className="hero-content">
                        <span className="hero-badge">🔥 Trending Now</span>
                        <h1 className="hero-title">{featuredMovie.title || featuredMovie.name}</h1>
                        <div className="hero-meta">
                            <span className="meta-rating">⭐ {featuredMovie.vote_average?.toFixed(1)}</span>
                            <span className="meta-year">{(featuredMovie.release_date || featuredMovie.first_air_date)?.split('-')[0]}</span>
                            <span className="meta-language">{getLanguageName(featuredMovie.original_language)}</span>
                        </div>
                        <p className="hero-description">
                            {featuredMovie.overview?.substring(0, 200)}
                            {featuredMovie.overview?.length > 200 ? '...' : ''}
                        </p>
                        <div className="hero-actions">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => setSelectedContent({ ...featuredMovie, media_type: 'movie' })}
                            >
                                <span className="btn-icon">▶</span> Play Now
                            </button>
                            <button className="btn btn-glass btn-lg">
                                <span className="btn-icon">+</span> My List
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Movies Section */}
            <section className="content-section" id="movies">
                <div className="section-container">
                    <div className="section-header">
                        <div className="title-group">
                            <h2 className="section-title">
                                <span className="title-icon">🎬</span> Movies
                            </h2>
                            <p className="section-subtitle">Blockbusters in every language</p>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="movieLang">Language:</label>
                            <select
                                id="movieLang"
                                value={movieFilter}
                                onChange={(e) => setMovieFilter(e.target.value)}
                                className="filter-select"
                            >
                                {languages.map(lang => (
                                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="content-grid">
                        {movies.slice(0, 10).map(movie => (
                            <ContentCard
                                key={movie.id}
                                content={movie}
                                type="movie"
                                onClick={() => setSelectedContent({ ...movie, media_type: 'movie' })}
                            />
                        ))}
                    </div>

                    {movies.length === 0 && (
                        <div className="empty-state">
                            <p>No movies found in this language. Try another!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Series Section */}
            <section className="content-section alt-bg" id="series">
                <div className="section-container">
                    <div className="section-header">
                        <div className="title-group">
                            <h2 className="section-title">
                                <span className="title-icon">📺</span> TV Series
                            </h2>
                            <p className="section-subtitle">Binge-worthy shows await</p>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="seriesLang">Language:</label>
                            <select
                                id="seriesLang"
                                value={seriesFilter}
                                onChange={(e) => setSeriesFilter(e.target.value)}
                                className="filter-select"
                            >
                                {languages.map(lang => (
                                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="content-grid">
                        {series.slice(0, 10).map(show => (
                            <ContentCard
                                key={show.id}
                                content={show}
                                type="series"
                                onClick={() => setSelectedContent({ ...show, media_type: 'tv' })}
                            />
                        ))}
                    </div>

                    {series.length === 0 && (
                        <div className="empty-state">
                            <p>No series found in this language. Try another!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <div className="logo">
                            <span className="logo-icon">▶</span>
                            <span className="logo-text">New<span className="accent">Flix</span></span>
                        </div>
                        <p>Your ultimate destination for movies & TV shows powered by TMDB.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-col">
                            <h4>Browse</h4>
                            <ul>
                                <li><a href="#movies">Movies</a></li>
                                <li><a href="#series">TV Series</a></li>
                                <li><a href="#">New Releases</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Languages</h4>
                            <ul>
                                <li><a href="#">English</a></li>
                                <li><a href="#">Hindi</a></li>
                                <li><a href="#">Kannada</a></li>
                                <li><a href="#">Tamil</a></li>
                                <li><a href="#">Telugu</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Help</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 NewFlix. Powered by TMDB | Made with ❤️</p>
                </div>
            </footer>

            {/* Watch Modal */}
            {selectedContent && (
                <WatchModal
                    content={selectedContent}
                    onClose={() => setSelectedContent(null)}
                />
            )}
        </div>
    )
}

export default HomePage
