import axios from 'axios';

// process.env.NODE_ENV

const api = axios.create({
   baseURL: 'http://localhost:3333',
});

export default api;
