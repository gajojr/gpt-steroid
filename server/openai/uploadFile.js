import openai from './index';
import fs from 'fs';

async function createFineTune(file) {
	try {
		const readableStream = fs.createReadStream(file);
		const uploadResponse = await openai.createFile(readableStream, 'fine-tune');
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

export default createFineTune;
