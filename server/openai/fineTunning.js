import { createReadStream } from 'fs';
import openai from './index.js';

export async function createFineTune(file) {
    try {
        const readableStream = createReadStream(`./fine-tunes/${file.originalname}`);
        const uploadResponse = await openai.createFile(readableStream, 'fine-tune');

        const response = await openai.createFineTune({
            training_file: uploadResponse.data.id,
            model: 'davinci',
        });

        const fineTunedModel = await waitForTuneToCreate();

        return {
            fileId: uploadResponse.data.id,
            tuneId: response.data.id,
            fineTunedModel
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

async function waitForTuneToCreate() {
    try {
        const response = await openai.listFineTunes();
        const fineTunes = response.data.data;

        // Check if last fine-tune is still pending
        const lastFineTune = fineTunes[fineTunes.length - 1];
        if (lastFineTune.status !== 'succeeded') {
            // If last fine-tune is still pending, wait for some time and call listFineTunes again
            await new Promise((resolve) => setTimeout(resolve, 60000));
            return await waitForTuneToCreate();
        } else {
            // If last fine-tune is succeeded, return fine_tuned_model
            console.log('data: ', lastFineTune.fine_tuned_model);
            return lastFineTune.fine_tuned_model;
        }
    } catch (err) {
        console.log('error:', err);
    }
}

export async function deleteFineTune(model, fileId) {
    try {
        await openai.deleteModel(model);
        await openai.deleteFile(fileId);
    } catch (err) {
        console.log('err: ', err);
    }
}