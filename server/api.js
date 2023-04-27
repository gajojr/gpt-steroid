import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'
dotenv.config();

const openaiApiKey = process.env.OPENAI_KEY
const configuration = new Configuration({
    apiKey: openaiApiKey
});

export const openai = new OpenAIApi(configuration)