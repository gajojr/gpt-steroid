import axios from 'axios';
import React, { useState } from 'react';

const FileUpload = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [message, setMessage] = useState('');

	const onFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const onFileUpload = async (e) => {
		e.preventDefault();

		if (!selectedFile) {
			setMessage('Please select a JSONL file.');
			return;
		}

		if (!selectedFile.name.endsWith('.jsonl')) {
			setMessage('Only JSONL files are allowed.');
			return;
		}

		const formData = new FormData();
		formData.append('file', selectedFile);

		try {
			const response = await axios.post('http://localhost:5000/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setMessage(response.data);
		} catch (error) {
			setMessage('Error uploading file: ' + error.message);
		}
	};

	return (
		<div className="App">
			<h1>JSONL File Uploader</h1>
			<form onSubmit={onFileUpload}>
				<input type="file" accept=".jsonl" onChange={onFileChange} />
				<button type="submit">Upload</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default FileUpload;