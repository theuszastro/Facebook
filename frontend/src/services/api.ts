import axios from 'axios';
import Constants from '../utils/Constants';

const { backendUrl: baseURL } = Constants;

const api = axios.create({ baseURL });

export default api;
