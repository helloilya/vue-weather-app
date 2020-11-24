import axios from 'axios';
import { GEO_API_PATH } from '@/api/constants';

const request = axios.create({
	baseURL: GEO_API_PATH,
	withCredentials: false,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
});

export default request;