import { getImageUrl, getLanguageName, BACKDROP_SIZE } from '../services/tmdb'
import './WatchModal.css'

function WatchModal({ content, onClose }) {
    const title = content.title || content.name
    const year = (content.release_date || content.first_air_date)?.split('-')[0]
    const rating = content.vote_average?.toFixed(1)
    const language = getLanguageName(content.original_language)
    const poster = getImageUrl(content.poster_path)
    const backdrop = getImageUrl(content.backdrop_path, BACKDROP_SIZE)

    const handlePlay = () => {
        alert(`🎬 Now playing: ${title}\n\nEnjoy your ${content.media_type === 'tv' ? 'series' : 'movie'}!`)
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
                                <span className="btn-icon">▶</span> Play Now
                            </button>
                            <button className="btn btn-glass btn-lg">
                                <span className="btn-icon">+</span> Add to List
                            </button>
                            <button className="btn btn-glass btn-lg">
                                <span className="btn-icon">👍</span> Like
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchModal
