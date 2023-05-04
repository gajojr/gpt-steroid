import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import openai from './index.js';

export async function createFineTune(file) {
	try {
		console.log('usao2');
		const filePath = join(
			dirname(new URL(import.meta.url).pathname),
			'../fine-tunes',
			file.originalname
		);
		console.log(filePath);
		const readableStream = createReadStream('./data.jsonl');
		console.log('usao3');
		const uploadResponse = await openai.createFile(readableStream, 'fine-tune');
		console.log('usao4');
		console.log(uploadResponse);

		const response = await openai.createFineTune({
			training_file: uploadResponse.data.id,
			model: 'davinci',
		});
		console.log('response: ', response);

		return uploadResponse.data.id;
	} catch (err) {
		console.log('error: ', err);
	}
}

export async function listFineTunes() {
	try {
		const response = await openai.listFineTunes();
		console.log('data: ', response.data.data);
		return response.data.data;
	} catch (err) {
		console.log('error:', err);
	}
}

export async function deleteFineTune(modelId) {
	try {
		const response = await openai.deleteModel(modelId);
		console.log('response: ', response);
	} catch (err) {
		console.log('err: ', err);
	}
}
