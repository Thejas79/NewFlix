// TMDB API Service
const API_KEY = 'b705911615ebba53736bd275c71040e2';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes
export const POSTER_SIZE = '/w500';
export const BACKDROP_SIZE = '/original';

// Helper to build image URL
export const getImageUrl = (path, size = POSTER_SIZE) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}${size}${path}`;
};

// Language codes for TMDB
export const languageCodes = {
    english: 'en',
    hindi: 'hi',
    kannada: 'kn',
    tamil: 'ta',
    telugu: 'te',
    malayalam: 'ml',
    spanish: 'es',
    french: 'fr',
    korean: 'ko',
    japanese: 'ja'
};

// Fetch trending movies
export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

// Fetch movies by language
export const fetchMoviesByLanguage = async (language = 'en') => {
    try {
        const langCode = languageCodes[language.toLowerCase()] || language;
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${langCode}&sort_by=popularity.desc&page=1`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching movies by language:', error);
        return [];
    }
};

// Discover movies with filters
export const discoverMovies = async ({ languages = [], genres = [] }) => {
    try {
        let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;

        if (languages.length > 0) {
            const langCodes = languages.map(l => languageCodes[l.toLowerCase()] || l).join('|');
            url += `&with_original_language=${langCodes}`;
        }

        if (genres.length > 0) {
            const genreIds = genres.join('|'); // OR logic
            url += `&with_genres=${genreIds}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error discovering movies:', error);
        return [];
    }
};

// Fetch popular TV series
export const fetchPopularSeries = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=1`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular series:', error);
        return [];
    }
};

// Fetch series by language
export const fetchSeriesByLanguage = async (language = 'en') => {
    try {
        const langCode = languageCodes[language.toLowerCase()] || language;
        const response = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=${langCode}&sort_by=popularity.desc&page=1`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching series by language:', error);
        return [];
    }
};

// Discover series with filters
export const discoverSeries = async ({ languages = [], genres = [] }) => {
    try {
        let url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;

        if (languages.length > 0) {
            const langCodes = languages.map(l => languageCodes[l.toLowerCase()] || l).join('|');
            url += `&with_original_language=${langCodes}`;
        }

        if (genres.length > 0) {
            const genreIds = genres.join('|'); // OR logic
            url += `&with_genres=${genreIds}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error discovering series:', error);
        return [];
    }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

// Fetch TV series details
export const fetchSeriesDetails = async (seriesId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching series details:', error);
        return null;
    }
};

// Fetch all content for a specific language (movies + series)
export const fetchContentByLanguage = async (language) => {
    const [movies, series] = await Promise.all([
        fetchMoviesByLanguage(language),
        fetchSeriesByLanguage(language)
    ]);
    return { movies, series };
};

// Search movies and TV shows
export const searchContent = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error searching content:', error);
        return [];
    }
};

// Get genre list for movies
export const fetchMovieGenres = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};

// Get genre list for TV
export const fetchTVGenres = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`
        );
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching TV genres:', error);
        return [];
    }
};

// Language name mapping
export const getLanguageName = (code) => {
    const names = {
        en: 'English',
        hi: 'Hindi',
        kn: 'Kannada',
        ta: 'Tamil',
        te: 'Telugu',
        ml: 'Malayalam',
        mr: 'Marathi',
        bn: 'Bengali',
        gu: 'Gujarati',
        pa: 'Punjabi',
        ko: 'Korean',
        ja: 'Japanese',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        it: 'Italian',
        pt: 'Portuguese',
        ru: 'Russian',
        zh: 'Chinese'
    };
    return names[code] || code?.toUpperCase() || 'Unknown';
};
