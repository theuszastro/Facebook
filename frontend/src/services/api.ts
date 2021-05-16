import axios from 'axios';
import Constants from '../utils/Constants';

const { backendUrl } = Constants;

const api = axios.create({ baseURL: backendUrl });

export default api;
