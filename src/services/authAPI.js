// Use relative URL - Vite proxy will forward to backend
const API_BASE_URL = '/api/auth';

export const authAPI = {
    // Sign up a new user
    signUp: async (username, email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('⚠️ Backend is not responding! Please start Spring Boot server:\n\ncd backend\nmvn spring-boot:run');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sign up failed');
            }

            return data;
        } catch (error) {
            console.error('Sign up error:', error);

            // Detect JSON parse errors (backend not running)
            if (error.name === 'SyntaxError' || error.message.includes('JSON')) {
                throw new Error('⚠️ Backend server is NOT running!\n\nPlease start it:\ncd backend\nmvn spring-boot:run');
            }

            throw error;
        }
    },

    // Sign in existing user
    signIn: async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('⚠️ Backend is not responding! Please start Spring Boot server:\n\ncd backend\nmvn spring-boot:run');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sign in failed');
            }

            return data;
        } catch (error) {
            console.error('Sign in error:', error);

            // Detect JSON parse errors (backend not running)
            if (error.name === 'SyntaxError' || error.message.includes('JSON')) {
                throw new Error('⚠️ Backend server is NOT running!\n\nPlease start it:\ncd backend\nmvn spring-boot:run');
            }

            throw error;
        }
    },

    // Test backend connection
    testConnection: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/test`);

            if (!response.ok) {
                throw new Error('Backend not responding');
            }

            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Connection test error:', error);
            throw new Error('Backend server is not running. Please start it first!');
        }
    }
};

// Helper function to store user data in localStorage
export const saveUserData = (userData) => {
    localStorage.setItem('newflix_user', JSON.stringify(userData));
};

// Helper function to get user data from localStorage
export const getUserData = () => {
    const userData = localStorage.getItem('newflix_user');
    return userData ? JSON.parse(userData) : null;
};

// Helper function to clear user data from localStorage
export const clearUserData = () => {
    localStorage.removeItem('newflix_user');
};

// Helper function to check if user is logged in
export const isLoggedIn = () => {
    return getUserData() !== null;
};

export default authAPI;
