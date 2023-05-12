import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import openai from './index.js';

export async function askQuestion(chatId, question, messageId) {
    try {
        console.log(question);

        const dir = './chats';
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        const fileName = `./chats/chat_${chatId}.json`;
        let messages = [];
        if (!existsSync(fileName)) {
            writeFileSync(fileName, JSON.stringify({ chatId, chatType: 'ChatGPT', messages: [] }));
        } else {
            const file = readFileSync(fileName, { encoding: 'utf8' });
            const fileParsed = JSON.parse(file);
            messages = fileParsed.messages;
        }

        const idxOfMessage = messages.findIndex(message => message.messageId === messageId);
        let completion;
        let response = '';
        if (idxOfMessage === -1) { // new message
            messages.push({
                role: 'user',
                content: question,
                messageId
            });

            completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                // model: 'gpt-4-32k',
                // prompt: question,
                // max_tokens: 1000,
                messages: messages.map(({ role, content }) => ({ role, content }))
            });

            console.log(completion.data.choices[0].message.content);
            response = completion.data.choices[0].message.content;

            messages.push({
                role: 'assistant',
                content: response.trim(),
                messageId: messageId + 1
            });
        } else { // edit existing message
            messages[idxOfMessage] = {
                ...messages[idxOfMessage],
                content: question
            }

            completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                // model: 'gpt-4-32k',
                // prompt: question,
                // max_tokens: 1000,
                messages: messages.slice(0, idxOfMessage + 1).map(({ role, content }) => ({ role, content }))
            });

            console.log(completion.data.choices[0].message.content);
            response = completion.data.choices[0].message.content;

            messages[idxOfMessage + 1] = {
                ...messages[idxOfMessage + 1],
                content: response.trim()
            }
        }

        const chatData = { chatId, chatType: 'ChatGPT', messages };

        // Convert the object to JSON string
        const jsonData = JSON.stringify(chatData);

        // Save the JSON data to a file, e.g. "chat_1.json"
        writeFileSync(`./chats/chat_${chatId}.json`, jsonData);

        // const codeRegex = /(```[\s\S]*?```|`[\s\S]*?`)/g;
        // const formattedResponse = response.replace(codeRegex, '<code>$1</code>');

        // console.log(formattedResponse);

        return response.trim();
    } catch (err) {
        // console.log('error: ', err);
    }
}

export async function askQuestionTuned(chatId, model, prompt, messageId) {
    try {
        const dir = './chats';
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        const fileName = `./chats/chat_${chatId}.json`;
        let messages = [];
        if (!existsSync(fileName)) {
            writeFileSync(fileName, JSON.stringify({ chatId, chatType: 'ChatGPT', messages: [] }));
        } else {
            const file = readFileSync(fileName, { encoding: 'utf8' });
            const fileParsed = JSON.parse(file);
            messages = fileParsed.messages;
        }

        const idxOfMessage = messages.findIndex(message => message.messageId === messageId);
        let response = '';
        if (idxOfMessage === -1) { // new message
            messages.push({
                role: 'user',
                content: prompt,
                messageId
            });

            response = await openai.createCompletion({
                model,
                prompt,
                max_tokens: 2000,
                stop: ' END',
            });

            messages.push({
                role: 'assistant',
                content: response.data.choices[0].text,
                messageId: messageId + 1
            });
        } else { // edit existing message
            messages[idxOfMessage] = {
                ...messages[idxOfMessage],
                content: prompt
            }

            response = await openai.createCompletion({
                model,
                prompt,
                max_tokens: 2000,
                stop: ' END',
            });

            messages[idxOfMessage + 1] = {
                ...messages[idxOfMessage + 1],
                content: response.data.choices[0].text
            }
        }

        const chatData = { chatId, chatType: 'ChatGPT', messages };

        // Convert the object to JSON string
        const jsonData = JSON.stringify(chatData);

        // Save the JSON data to a file, e.g. "chat_1.json"
        writeFileSync(`./chats/chat_${chatId}.json`, jsonData);

        return response.data.choices[0].text;
    } catch (err) {
        console.log('err: ', err);
    }
}