import { getImageUrl, getLanguageName } from '../services/tmdb'
import './ContentCard.css'

function ContentCard({ content, type = 'movie', onClick }) {
    const title = content.title || content.name
    const year = (content.release_date || content.first_air_date)?.split('-')[0]
    const rating = content.vote_average?.toFixed(1)
    const language = getLanguageName(content.original_language)
    const poster = getImageUrl(content.poster_path)

    return (
        <div className="content-card" onClick={onClick}>
            <img
                src={poster}
                alt={title}
                className="card-poster"
                loading="lazy"
            />
            <div className="card-overlay">
                <span className="card-language">{language}</span>
                <div className="card-info">
                    <h3 className="card-title">{title}</h3>
                    <div className="card-meta">
                        <span className="card-rating">⭐ {rating}</span>
                        <span className="card-year">{year}</span>
                        {type === 'series' && content.number_of_seasons && (
                            <span className="card-seasons">{content.number_of_seasons}S</span>
                        )}
                    </div>
                </div>
                <div className="card-play">
                    <span>▶</span>
                </div>
            </div>
        </div>
    )
}

export default ContentCard
