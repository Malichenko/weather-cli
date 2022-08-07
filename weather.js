#!/usr/bin/env node
import getArguments from './Utils/getArguments.js';
import { printError, printHelp, printSuccess, printWeather } from './Services/log.service.js';
import { saveKeyValue } from './Services/storage.service.js';
import { getWeather } from './Services/api.service.js';
import { ARGS_KEY_DICTIONARY } from './Constants.js';

const saveToken = async (token) => {
	try {
		if (token.length) {
			await saveKeyValue(ARGS_KEY_DICTIONARY.token, token);
			printSuccess('Token has been saved');
		} else {
			throw new Error('Token was not pass!!!');
		}
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	try {
		if (city.length) {
			await saveKeyValue(ARGS_KEY_DICTIONARY.city, city);
			printSuccess('City has been saved');
		} else {
			throw new Error('City was not pass!!!');
		}
	} catch (e) {
		printError(e.message);
	}
}

const getForcast = async () => {
	try {
		const weather = await getWeather();
		printWeather(weather);
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('City was not found!');
		} else if (e?.response?.status === 401) {
			printError('Invalid token!');
		} else {
			printError(e.message);
		}
	}
};

const intiCLI = () => {
	const args = getArguments(process.argv);
	const argsKeys = Object.keys(args);

	if (argsKeys.length === 0) {
		// Show weather
		printSuccess('Show weather');
		return getForcast();
	} else if (argsKeys.some(el => [ 'h', 'c', 't' ].includes(el))) {
		if (args.h) {
			// Show help
			printHelp();
		}
		if (args.c) {
			// Save city
			return saveCity(args.c)
		}
		if (args.t) {
			// Save token
			return saveToken(args.t);
		}
	} else {
		printError(`Flags ${argsKeys.toString()} - are invalid please run node weather.js -h to see all flags`);
	}
};

intiCLI();
