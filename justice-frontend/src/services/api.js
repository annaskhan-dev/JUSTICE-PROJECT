import axios from 'axios';

// Create an instance pointing directly to your local Express server
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Authentication endpoints
export const registerUser = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await API.post('/auth/login', userData);
    return response.data;
};

export default API;