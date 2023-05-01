import openai from './index';

async function askQuestion(question) {
	try {
		console.log(question);
		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: question,
			max_tokens: 300,
		});
		console.log(completion.data.choices[0].text);
		return completion.data.choices[0].text;
	} catch (err) {
		console.log('error: ', err.response.data.error);
	}
}

export default askQuestion;
