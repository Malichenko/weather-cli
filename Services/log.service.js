import chalk from 'chalk';
import dedent from 'dedent-js';
import { WEATHER_ICON_DICTIONARY } from '../Constants.js';

export const printError = (errorMsg) => {
	console.log(chalk.red(`ERROR: ${errorMsg}`));
};

export const printSuccess = (mag) => {
	console.log(chalk.green(`SUCCESS: ${mag}`));
};

export const printHelp = () => {
	console.log(
		dedent`${chalk.cyan('HELP')}
			${chalk.cyan('-----------------------------')}
			Without flags - print weather
			${chalk.cyan('-----------------------------')}
			Flag -h |         | -print help
			Flag -c | [city]  | - save city
			Flag -t | [token] | - save token
			${chalk.cyan('-----------------------------')}
	`
	);
};

export const printWeather = (weatherData) => {
	const _weatherInfo = weatherData.weather[0];
	console.log(
		dedent`${chalk.yellow(`WEATHER in ${weatherData.name}`)} ${WEATHER_ICON_DICTIONARY[_weatherInfo.icon]}  ${_weatherInfo.description}
			${chalk.yellow('Temperature:')} ${weatherData.main.temp} (feels like: ${weatherData.main.feels_like})
			${chalk.yellow('Humidity:')} ${weatherData.main.humidity}%
			${chalk.yellow('Wind speed:')} ${weatherData.wind.speed} meter/sec
	`
	);
};
