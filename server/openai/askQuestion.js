import openai from './index.js';

export async function askQuestion(question) {
    try {
        console.log(question);
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            // model: 'gpt-4-32k',
            prompt: question,
            max_tokens: 1000,
        });
        console.log(completion.data.choices[0].text);
        const response = completion.data.choices[0].text;

        // const codeRegex = /(```[\s\S]*?```|`[\s\S]*?`)/g;
        // const formattedResponse = response.replace(codeRegex, '<code>$1</code>');

        // console.log(formattedResponse);

        return response.trim();
    } catch (err) {
        console.log('error: ', err.response.data.error);
    }
}

export async function askQuestionTuned(model, prompt) {
    try {
        const response = await openai.createCompletion({
            model,
            prompt,
            max_tokens: 2000,
            stop: ' END',
        });
        if (response.data) {
            console.log('choices: ', response.data.choices);
        }

        return response.data.choices[0].text;
    } catch (err) {
        console.log('err: ', err);
    }
}