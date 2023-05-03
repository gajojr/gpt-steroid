import express from 'express';
import cors from 'cors';
const app = express();
import { askQuestion } from './openai/askQuestion.js';

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/upload-file', async (req, res) => {
	const { file } = req.files;
	try {
		const fileId = await createFineTune(file);
		res.json({ fileId });
	} catch (err) {
		console.log('error: ', err);
		res.status(500).send('Server error');
	}
});

app.post('/ask-question', async (req, res) => {
	const { question } = req.body;
	const answer = await askQuestion(question);
	res.send(answer);
});

app.post('/ask-question-tuned', async (req, res) => {
	const { question, modelId } = req.body;
	const answer = await askQuestion(modelId, question);
	res.send(answer);
});

app.listen(8000, () => {
	console.log('Server listening on port 8000');
});
