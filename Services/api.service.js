import { getKeyValue } from './storage.service.js';
import { ARGS_KEY_DICTIONARY } from '../Constants.js';
import axios from 'axios';

export const getWeather = async () => {
	const [ city, token ] = await Promise
		.all([ ARGS_KEY_DICTIONARY.city, ARGS_KEY_DICTIONARY.token ]
			.map(async (value) => await getKeyValue(value)));

	if (!token) throw new Error('No API token, please setup token using -t [API_KEY]');
	if (!city) throw new Error('City not entered, please setup token using -с [CITY]');
	console.log('some log');

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			units: 'metric',
			lang: 'en'
		}
	});

	return data;
};
