// Use relative URL - Vite proxy will forward to backend
const API_BASE_URL = '/api/content';

// Get user data helper
const getUser = () => {
    const userStr = localStorage.getItem('newflix_user');
    return userStr ? JSON.parse(userStr) : null;
};

export const contentAPI = {
    // Toggle Like
    toggleLike: async (content, status) => {
        const user = getUser();
        if (!user) throw new Error('User not logged in');

        const response = await fetch(`${API_BASE_URL}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                contentId: content.id.toString(),
                contentType: content.media_type || 'movie',
                title: content.title || content.name,
                posterPath: content.poster_path,
                status: status
            })
        });

        if (!response.ok) throw new Error('Failed to update like status');
        return await response.json();
    },

    // Toggle Watchlist
    toggleWatchlist: async (content, status) => {
        const user = getUser();
        if (!user) throw new Error('User not logged in');

        const response = await fetch(`${API_BASE_URL}/watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                contentId: content.id.toString(),
                contentType: content.media_type || 'movie',
                title: content.title || content.name,
                posterPath: content.poster_path,
                status: status
            })
        });

        if (!response.ok) throw new Error('Failed to update watchlist');
        return await response.json();
    },

    // Get all user content interactions
    getUserContent: async () => {
        const user = getUser();
        if (!user) return [];

        try {
            const response = await fetch(`${API_BASE_URL}/user/${user.username}`);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch user content", error);
            return [];
        }
    }
};

export default contentAPI;
