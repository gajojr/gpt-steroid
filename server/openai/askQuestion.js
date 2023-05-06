import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import openai from './index.js';

export async function askQuestion(chatId, question) {
    try {
        const dir = './chats';
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        const fileName = `./chats/chat_${chatId}.json`;
        let messages = [];
        if (!existsSync(fileName)) {
            writeFileSync(fileName, JSON.stringify({ chatId, messages: [] }));
        } else {
            const file = readFileSync(fileName, { encoding: 'utf8' });
            const fileParsed = JSON.parse(file);
            messages = fileParsed.messages;
            console.log(messages);
        }

        messages.push({
            role: 'user',
            content: question
        });

        console.log(question);
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            // model: 'gpt-4-32k',
            // prompt: question,
            // max_tokens: 1000,
            messages
        });

        console.log(completion.data.choices[0].message.content);
        const response = completion.data.choices[0].message.content;

        messages.push({
            role: 'assistant',
            content: response.trim()
        });

        const chatData = { chatId, messages };

        // Convert the object to JSON string
        const jsonData = JSON.stringify(chatData);

        // Save the JSON data to a file, e.g. "chat_1.json"
        writeFileSync(`./chats/chat_${chatId}.json`, jsonData);

        // const codeRegex = /(```[\s\S]*?```|`[\s\S]*?`)/g;
        // const formattedResponse = response.replace(codeRegex, '<code>$1</code>');

        // console.log(formattedResponse);

        return response.trim();
    } catch (err) {
        console.log('error: ', err);
    }
}

export async function askQuestionTuned(chatId, model, prompt) {
    try {
        const dir = './chats';
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        const fileName = `./chats/chat_${chatId}.json`;
        let messages = [];
        if (!existsSync(fileName)) {
            writeFileSync(fileName, JSON.stringify({ chatId, messages: [] }));
        } else {
            const file = readFileSync(fileName, { encoding: 'utf8' });
            const fileParsed = JSON.parse(file);
            messages = fileParsed.messages;
            console.log(messages);
        }

        messages.push({
            role: 'user',
            content: prompt
        });

        const response = await openai.createCompletion({
            model,
            prompt,
            max_tokens: 2000,
            stop: ' END',
        });
        if (response.data) {
            console.log('choices: ', response.data.choices);
        }

        messages.push({
            role: 'assistant',
            content: response.data.choices[0].text
        });

        const chatData = { chatId, messages };

        // Convert the object to JSON string
        const jsonData = JSON.stringify(chatData);

        // Save the JSON data to a file, e.g. "chat_1.json"
        writeFileSync(`./chats/chat_${chatId}.json`, jsonData);

        return response.data.choices[0].text;
    } catch (err) {
        console.log('err: ', err);
    }
}