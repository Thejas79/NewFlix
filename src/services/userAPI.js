const API_URL = '/api/user';

export const userAPI = {
    getUserProfile: async (username) => {
        const response = await fetch(`${API_URL}/${username}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        return await response.json();
    },

    updateProfile: async (username, data) => {
        const response = await fetch(`${API_URL}/${username}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to update profile');
        }
        return await response.json();
    },

    subscribe: async (username, plan, durationMonths) => {
        const response = await fetch(`${API_URL}/${username}/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan, durationMonths })
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to update subscription');
        }
        return await response.json();
    }
};
