import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_PATH } from '@/api/constants';

const request = axios.create({
	baseURL: WEATHER_API_PATH,
	withCredentials: false,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
});

request.interceptors.request.use((config) => {
	config.params.appid = WEATHER_API_KEY;
	return config;
});

export default request;