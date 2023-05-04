import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { askQuestion } from './openai/askQuestion.js';
import {
	listFineTunes,
	deleteFineTune,
	createFineTune,
} from './openai/fineTunning.js';

const app = express();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './fine-tunes');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/fine-tunes', async (req, res) => {
	const fineTunes = listFineTunes();
	res.send(fineTunes);
});

app.post('/upload-file', upload.single('file'), async (req, res) => {
	const file = req.file;
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

app.delete('/fine-tune', async (req, res) => {
	await deleteFineTune(req.modelId);
	res.json({ status: 'success' });
});

app.listen(8000, () => {
	console.log('Server listening on port 8000');
});
