import express from 'express';
import cors from 'cors';
import multer from 'multer';
import streamifier from 'streamifier';
import fs from 'fs';
import { openai } from './api.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.originalname.endsWith('.jsonl')) {
            cb(null, true);
        } else {
            cb(new Error('Only JSONL files are allowed.'), false);
        }
    },
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/upload', upload.single('file'), async(req, res) => {
    try {
        console.log(req.file);
        const readableStream = streamifier.createReadStream(req.file.buffer);
		console.log(readableStream);

        // const response = await openai.createFile(
        //     readableStream,
        //     'fine-tune'
        // );
        // console.log('File ID: ', response.data.id);
        // res.status(200).send('File uploaded successfully and sent to OpenAI API.');
    } catch (err) {
        console.log('err: ', err);
        res.status(500).send('Error uploading file to OpenAI API.');
    }
});

// Set the port to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});