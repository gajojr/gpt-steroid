import { createReadStream } from 'fs';
import openai from './index.js';

export async function createFineTune(file) {
    try {
        const readableStream = createReadStream(`./fine-tunes/${file.originalname}`);
        const uploadResponse = await openai.createFile(readableStream, 'fine-tune');
        console.log(uploadResponse);

        const response = await openai.createFineTune({
            training_file: uploadResponse.data.id,
            model: 'davinci',
        });
        console.log('response: ', response);

		return {
			fileId: uploadResponse.data.id,
			tuneId: response.data.id,
		};
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