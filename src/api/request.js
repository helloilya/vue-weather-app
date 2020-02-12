import axios from 'axios';
import { API_KEY, API_PATH } from '@/constants';

const request = axios.create({
	baseURL: API_PATH,
	withCredentials: false,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
});

request.interceptors.request.use((config) => {
	config.params.appid = API_KEY;
	return config;
});

export default request;