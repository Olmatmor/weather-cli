import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	};
	//const geo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${key}`;
	//const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
	const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
	url.searchParams.append('q', city);
	url.searchParams.append('limit', 5);
	url.searchParams.append('appid', token);


	https.get()
};