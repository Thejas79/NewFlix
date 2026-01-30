import { useState, useEffect } from 'react'
import { getImageUrl, getLanguageName, BACKDROP_SIZE } from '../services/tmdb'
import { contentAPI } from '../services/contentAPI'
import './WatchModal.css'

function WatchModal({ content, onClose, user, onSubscribe }) {
    const [isLiked, setIsLiked] = useState(false)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const title = content.title || content.name
    const year = (content.release_date || content.first_air_date)?.split('-')[0]
    const rating = content.vote_average?.toFixed(1)
    const language = getLanguageName(content.original_language)
    const poster = getImageUrl(content.poster_path)
    const backdrop = getImageUrl(content.backdrop_path, BACKDROP_SIZE)

    // Check backend status on mount
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const userContent = await contentAPI.getUserContent()
                const currentItem = userContent.find(item =>
                    item.contentId === content.id.toString() &&
                    item.contentType === (content.media_type || 'movie')
                )

                if (currentItem) {
                    setIsLiked(currentItem.liked)
                    setIsInWatchlist(currentItem.inWatchlist)
                }
            } catch (error) {
                console.error("Failed to check status", error)
            } finally {
                setIsLoading(false)
            }
        }
        checkStatus()
    }, [content.id])

    const handlePlay = () => {
        if (user?.subscriptionStatus !== 'ACTIVE') {
            onSubscribe()
            return
        }
        alert(`🎬 Now playing: ${title}\n\nEnjoy your ${content.media_type === 'tv' ? 'series' : 'movie'}!`)
    }

    const toggleLike = async () => {
        const newStatus = !isLiked
        setIsLiked(newStatus) // Optimistic update
        try {
            await contentAPI.toggleLike(content, newStatus)
        } catch (error) {
            setIsLiked(!newStatus) // Revert on error
            console.error("Like failed", error)
        }
    }

    const toggleWatchlist = async () => {
        const newStatus = !isInWatchlist
        setIsInWatchlist(newStatus) // Optimistic update
        try {
            await contentAPI.toggleWatchlist(content, newStatus)
        } catch (error) {
            setIsInWatchlist(!newStatus) // Revert on error
            console.error("Watchlist failed", error)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="watch-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div
                    className="modal-backdrop"
                    style={{ backgroundImage: `url(${backdrop})` }}
                >
                    <div className="backdrop-gradient"></div>
                </div>

                <div className="modal-content">
                    <div className="modal-poster">
                        <img src={poster} alt={title} />
                    </div>

                    <div className="modal-details">
                        <span className="modal-badge">
                            {content.media_type === 'tv' ? 'TV Series' : 'Movie'}
                        </span>
                        <h2 className="modal-title">{title}</h2>

                        <div className="modal-meta">
                            <span className="meta-rating">⭐ {rating}</span>
                            <span className="meta-year">{year}</span>
                            <span className="meta-language">{language}</span>
                            {content.number_of_seasons && (
                                <span className="meta-seasons">{content.number_of_seasons} Seasons</span>
                            )}
                            {content.vote_count && (
                                <span className="meta-votes">{content.vote_count.toLocaleString()} votes</span>
                            )}
                        </div>

                        <p className="modal-description">
                            {content.overview || 'No description available.'}
                        </p>

                        <div className="modal-actions">
                            <button className="btn btn-primary btn-lg" onClick={handlePlay}>
                                <span className="btn-icon">{user?.subscriptionStatus === 'ACTIVE' ? '▶' : '🔒'}</span>
                                {user?.subscriptionStatus === 'ACTIVE' ? 'Play Now' : 'Subscribe to Watch'}
                            </button>
                            <button
                                className={`btn btn-glass btn-lg ${isInWatchlist ? 'active' : ''}`}
                                onClick={toggleWatchlist}
                            >
                                <span className="btn-icon">{isInWatchlist ? '✓' : '+'}</span>
                                {isInWatchlist ? 'In Watchlist' : 'Add to List'}
                            </button>
                            <button
                                className={`btn btn-glass btn-lg ${isLiked ? 'active' : ''}`}
                                onClick={toggleLike}
                            >
                                <span className="btn-icon">{isLiked ? '❤️' : '👍'}</span>
                                {isLiked ? 'Liked' : 'Like'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchModal
