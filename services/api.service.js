import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getCoordinates = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t, --token <API_KEY>');
	};
	const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			limit: 5,
			appid: token
		}
	});
	return data;
};

const getWeather = async () => {
	const city = await getKeyValue(TOKEN_DICTIONARY.city);
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	const coord = await getCoordinates(city);
	let lat = coord[0].lat;
	let lon = coord[0].lon;
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	};
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: lat,
			lon: lon,
			appid: token,
			units: 'metric',
			lang: 'ru'
		}
	});
	return data;
};

export { getWeather };