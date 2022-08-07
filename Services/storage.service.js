import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const FILE_PATH = join(homedir(), 'weather-config.json');

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};

const getFileData = async (path) => {
	const file = await promises.readFile(path);
	return JSON.parse(file.toString());
};

const getKeyValue = async (key) => {
	if (await isExist(FILE_PATH)) {
		const data = await getFileData(FILE_PATH);
		return data[key];
	}
	return undefined;
};

const saveKeyValue = async (key, value) => {
	let data = {};
	if (await isExist(FILE_PATH)) {
		data = await getFileData(FILE_PATH);
	}
	data[key] = value;
	await promises.writeFile(FILE_PATH, JSON.stringify(data));
};

export { saveKeyValue, getKeyValue };


