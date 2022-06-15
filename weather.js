#!/usr/bin/env node
import { Command } from 'commander';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранен');
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан город');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранен');
	} catch (e) {
		printError(e.message);
	}
};

const getForcast = async () => {
	try {
		const weather = await getWeather();
		printWeather(weather);
	}
	catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
};

const initCLI = async () => {
	const program = new Command();

	program
		.option('-c, --city <CITY_NAME>', 'Введите город')
		.option('-h, --help', 'Вывод справки по CLI')
		.option('-t, --token <API_KEY>', 'Ввод токена');
	program.parse(process.argv);

	const options = program.opts();
	if (options.help) {
		//Вывод help
		printHelp();
	} else if (options.city) {
		//Сохранить город
		saveCity(options.city);
	} else if (options.token) {
		//Сохранить токен
		return saveToken(options.token);
	} else {	//Вывести погоду
		getForcast();
	}
};

initCLI();