import { useState, useEffect } from 'react'
import {
    fetchTrendingMovies,
    fetchPopularMovies,
    fetchPopularSeries,
    fetchMoviesByLanguage,
    fetchSeriesByLanguage,
    getImageUrl,
    BACKDROP_SIZE,
    getLanguageName,
    searchContent,
    discoverMovies,
    discoverSeries,
    fetchMovieGenres,
    fetchTVGenres
} from '../services/tmdb'
import ContentCard from '../components/ContentCard'
import WatchModal from '../components/WatchModal'
import MySpace from './MySpace'
import './HomePage.css'

const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' }
]

const categories = [
    { id: 'cat1', name: 'Action', icon: '💥' },
    { id: 'cat2', name: 'Comedy', icon: '😂' },
    { id: 'cat3', name: 'Drama', icon: '🎭' },
    { id: 'cat4', name: 'Horror', icon: '👻' },
    { id: 'cat5', name: 'Romance', icon: '💕' },
    { id: 'cat6', name: 'Sci-Fi', icon: '🚀' },
    { id: 'cat7', name: 'Thriller', icon: '🔪' },
    { id: 'cat8', name: 'Documentary', icon: '📹' },
    { id: 'cat9', name: 'Animation', icon: '🎨' },
    { id: 'cat10', name: 'Fantasy', icon: '🧙' }
]

const languagesPreferences = [
    { id: 'lang1', name: 'English', flag: '🇺🇸' },
    { id: 'lang2', name: 'Hindi', flag: '🇮🇳' },
    { id: 'lang3', name: 'Kannada', flag: '🇮🇳' },
    { id: 'lang4', name: 'Tamil', flag: '🇮🇳' },
    { id: 'lang5', name: 'Telugu', flag: '🇮🇳' },
    { id: 'lang6', name: 'Malayalam', flag: '🇮🇳' },
    { id: 'lang7', name: 'Spanish', flag: '🇪🇸' },
    { id: 'lang8', name: 'French', flag: '🇫🇷' },
    { id: 'lang9', name: 'Korean', flag: '🇰🇷' },
    { id: 'lang10', name: 'Japanese', flag: '🇯🇵' }
]

const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western', 'Musical'
]

function HomePage({ user, onLogout }) {
    const [movieFilter, setMovieFilter] = useState('all')
    const [seriesFilter, setSeriesFilter] = useState('all')
    const [selectedContent, setSelectedContent] = useState(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showMySpace, setShowMySpace] = useState(false)
    const [mySpaceTab, setMySpaceTab] = useState('overview')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [showPreferences, setShowPreferences] = useState(false)

    // Data states
    const [featuredMovie, setFeaturedMovie] = useState(null)
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true)

    // Preference states
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genreMap, setGenreMap] = useState({ movie: [], tv: [] })

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [trendingData, moviesData, seriesData, movieGenres, tvGenres] = await Promise.all([
                    fetchTrendingMovies(),
                    fetchPopularMovies(),
                    fetchPopularSeries(),
                    fetchMovieGenres(),
                    fetchTVGenres()
                ])

                setGenreMap({
                    movie: movieGenres,
                    tv: tvGenres
                })

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



    // Save Preferences Handler

    const handleSavePreferences = async () => {
        setLoading(true)
        try {
            // Map selected languages names to what the API expects (names are fine, service handles code mapping)
            // Need to get the actual names from IDs
            const languageNames = selectedLanguages.map(id => {
                const lang = languagesPreferences.find(l => l.id === id)
                return lang ? lang.name : null
            }).filter(Boolean)

            // Map selected genres and categories to IDs
            // Categories and Genres are both just genres in our UI
            // Categories: { id: 'cat1', name: 'Action' }
            // Genres: 'Action'

            const selectedGenreNames = [
                ...selectedCategories.map(id => categories.find(c => c.id === id)?.name),
                ...selectedGenres
            ].filter(Boolean)

            // Deduplicate names
            const uniqueGenreNames = [...new Set(selectedGenreNames)]

            // Get IDs for Movies
            const movieGenreIds = uniqueGenreNames.map(name =>
                genreMap.movie.find(g => g.name === name)?.id
            ).filter(Boolean)

            // Get IDs for TV
            const tvGenreIds = uniqueGenreNames.map(name =>
                genreMap.tv.find(g => g.name === name)?.id
            ).filter(Boolean)

            // Fetch filtered content
            const [filteredMovies, filteredSeries] = await Promise.all([
                discoverMovies({
                    languages: languageNames,
                    genres: movieGenreIds
                }),
                discoverSeries({
                    languages: languageNames,
                    genres: tvGenreIds
                })
            ])

            setMovies(filteredMovies)
            setSeries(filteredSeries)
            setShowPreferences(false)

            // Reset standard filters to 'all' to avoid confusion
            setMovieFilter('all')
            setSeriesFilter('all')

        } catch (error) {
            console.error('Error applying preferences:', error)
        } finally {
            setLoading(false)
        }
    }

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

    // Search functionality
    useEffect(() => {
        const performSearch = async () => {
            if (searchQuery.trim().length > 0) {
                setIsSearching(true)
                const results = await searchContent(searchQuery)
                // Filter to only show movies and TV shows (exclude people)
                const filtered = results.filter(item =>
                    item.media_type === 'movie' || item.media_type === 'tv'
                )
                setSearchResults(filtered)
            } else {
                setIsSearching(false)
                setSearchResults([])
            }
        }

        // Debounce search
        const timeoutId = setTimeout(performSearch, 500)
        return () => clearTimeout(timeoutId)
    }, [searchQuery])

    // Preference handlers
    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        )
    }

    const handleLanguageToggle = (languageId) => {
        setSelectedLanguages(prev =>
            prev.includes(languageId)
                ? prev.filter(id => id !== languageId)
                : [...prev, languageId]
        )
    }

    const handleGenreToggle = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        )
    }

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
                <div className="nav-search">
                    <input
                        type="text"
                        placeholder="Search movies, series, actors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input-nav"
                    />
                    <button className="search-btn-nav" onClick={() => console.log('Searching for:', searchQuery)}>
                        🔍
                    </button>
                </div>
                <div className="nav-right">
                    <button
                        className="btn btn-outline btn-sm preferences-toggle"
                        onClick={() => setShowPreferences(!showPreferences)}
                    >
                        ⚙️ Preferences
                    </button>
                    <div className="user-info">
                        <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                        <span className="user-name">Hi, <strong>{user.username}</strong></span>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={() => { setMySpaceTab('overview'); setShowMySpace(true); }}>
                        My Space
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={onLogout}>
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Preferences Dropdown */}
            {showPreferences && (
                <div className="preferences-dropdown">
                    <div className="preferences-dropdown-container">
                        <div className="preferences-header">
                            <h3>⚙️ Customize Your Preferences</h3>
                            <button className="close-preferences" onClick={() => setShowPreferences(false)}>✕</button>
                        </div>

                        <div className="preferences-tabs">
                            <div className="preferences-tab-content">
                                {/* Categories */}
                                <div className="pref-section">
                                    <h4>📂 Categories</h4>
                                    <div className="pref-grid">
                                        {categories.map(category => (
                                            <div
                                                key={category.id}
                                                className={`pref-chip ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                                                onClick={() => handleCategoryToggle(category.id)}
                                            >
                                                <span>{category.icon} {category.name}</span>
                                                {selectedCategories.includes(category.id) && <span className="chip-check">✓</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="pref-section">
                                    <h4>🌍 Languages</h4>
                                    <div className="pref-grid">
                                        {languagesPreferences.map(language => (
                                            <div
                                                key={language.id}
                                                className={`pref-chip ${selectedLanguages.includes(language.id) ? 'selected' : ''}`}
                                                onClick={() => handleLanguageToggle(language.id)}
                                            >
                                                <span>{language.flag} {language.name}</span>
                                                {selectedLanguages.includes(language.id) && <span className="chip-check">✓</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Genres */}
                                <div className="pref-section">
                                    <h4>🎭 Genres</h4>
                                    <div className="pref-tags">
                                        {genres.map(genre => (
                                            <div
                                                key={genre}
                                                className={`pref-tag ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                                                onClick={() => handleGenreToggle(genre)}
                                            >
                                                {genre} {selectedGenres.includes(genre) && '✓'}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="preferences-footer">
                                <button className="btn btn-primary" onClick={handleSavePreferences}>
                                    💾 Save Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

            {/* Search Results Section */}
            {isSearching && searchQuery && (
                <section className="content-section search-results-section">
                    <div className="section-container">
                        <div className="section-header">
                            <div className="title-group">
                                <h2 className="section-title">
                                    <span className="title-icon">🔍</span> Search Results for "{searchQuery}"
                                </h2>
                                <p className="section-subtitle">
                                    Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                                </p>
                            </div>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => {
                                    setSearchQuery('')
                                    setIsSearching(false)
                                    setSearchResults([])
                                }}
                            >
                                Clear Search
                            </button>
                        </div>

                        {searchResults.length > 0 ? (
                            <div className="content-grid">
                                {searchResults.map(item => (
                                    <ContentCard
                                        key={`${item.media_type}-${item.id}`}
                                        content={item}
                                        type={item.media_type === 'tv' ? 'series' : 'movie'}
                                        onClick={() => setSelectedContent(item)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>No results found for "{searchQuery}". Try a different search term!</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Movies Section */}
            {!isSearching && (
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
            )}

            {/* Series Section */}
            {!isSearching && (
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
            )}

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
                    <p>© 2025 NewFlix. Powered by TMDB</p>
                </div>
            </footer>

            {/* Watch Modal */}
            {selectedContent && (
                <WatchModal
                    content={selectedContent}
                    onClose={() => setSelectedContent(null)}
                    user={user}
                    onSubscribe={() => {
                        setSelectedContent(null)
                        setMySpaceTab('subscription')
                        setShowMySpace(true)
                    }}
                />
            )}

            {/* My Space Modal */}
            {showMySpace && (
                <MySpace
                    user={user}
                    onClose={() => setShowMySpace(false)}
                    initialTab={mySpaceTab}
                />
            )}
        </div>
    )
}

export default HomePage
