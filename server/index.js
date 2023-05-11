import { existsSync, mkdirSync, unlink } from 'fs';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { askQuestion, askQuestionTuned } from './openai/askQuestion.js';
import {
    listFineTunes,
    deleteFineTune,
    createFineTune,
} from './openai/fineTunning.js';
import startAutoGPT from './autogpt.js';

const childProcess = startAutoGPT();

const app = express();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './fine-tunes';
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(
    cors()
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/fine-tunes', async(req, res) => {
    const fineTunes = listFineTunes();
    res.send(fineTunes);
});

app.post('/upload-file', upload.single('file'), async(req, res) => {
    const file = req.file;
    try {
        const { fileId, tuneId, fineTunedModel } = await createFineTune(file);
        res.json({ fileId, tuneId, fineTunedModel });
    } catch (err) {
        console.log('error: ', err);
        res.status(500).send('Server error');
    }
});

app.post('/ask-question', async(req, res) => {
    const { chatId, question } = req.body;
    const answer = await askQuestion(chatId, question);
    res.send(answer);
});

app.post('/ask-question-tuned', async(req, res) => {
    const { chatId, question, model } = req.body;
    const answer = await askQuestionTuned(chatId, model, question);
    res.send(answer);
});

app.delete('/chat', async(req, res) => {
    unlink(`./chats/chat_${req.body.chatId}.json`, (err) => {
        if (err) throw err;
        console.log('File deleted!');
    });
    res.json({ status: 'success' });
});

app.delete('/fine-tune', async(req, res) => {
    await deleteFineTune(req.body.model, req.body.fileId);
    res.json({ status: 'success' });
});

app.post('/autogpt-question', async(req, res) => {
    const { question } = req.body;
    childProcess.stdin.write(question + '\n');
    let outputBuffer = '';

    const onData = (data) => {
        if (data.indexOf(`Enter 'y' to authorise command`) !== -1) {
            res.send(`THOUGHTS: ${outputBuffer.split('THOUGHTS:')[1].trim()}`);
            return childProcess.stdout.off('data', onData); // remove listener from this request so next response works
        }

        if (!data.toString().includes('/ Thinking...') &&
            !data.toString().includes('| Thinking...') &&
            !data.toString().includes('\\ Thinking...') &&
            !data.toString().includes('- Thinking...')
        ) {
            outputBuffer += data.toString().replace(/\[\d+m/g, '');
        }
    };

    childProcess.stdout.on('data', onData);

    childProcess.on('end', () => {
        res.send(outputBuffer);
        return childProcess.stdout.off('data', onData); // remove listener from this request so next response works
    });
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});