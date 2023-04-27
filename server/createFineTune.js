import * as dotenv from 'dotenv'
dotenv.config();
import { openai } from './api.js'

async function createFineTune() {
    try {
        const response = await openai.createFineTune({
            training_file: process.env.FILE_ID,
            model: 'davinci'
        })
        console.log('response: ', response)
    } catch (err) {
        console.log('error: ', err.response.data.error)
    }
}

createFineTune()