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
		const response = completion.data.choices[0].text;

		// const codeRegex = /(```[\s\S]*?```|`[\s\S]*?`)/g;
		// const formattedResponse = response.replace(codeRegex, '<code>$1</code>');

		// console.log(formattedResponse);

		return response.trim();
	} catch (err) {
		console.log('error: ', err.response.data.error);
	}
}

export default askQuestion;
