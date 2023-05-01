import openai from './index';
import fs from 'fs';

async function createFineTune() {
	try {
		const uploadResponse = await openai.createFile(
			fs.createReadStream('./data_prepared.jsonl'),
			'fine-tune'
		);

		const response = await openai.createFineTune({
			training_file: uploadResponse.data.id,
			model: 'davinci',
		});
		console.log('response: ', response);
	} catch (err) {
		console.log('error: ', err.response.data.error);
	}
}

export default createFineTune;
