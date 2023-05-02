import React, { useRef, useState } from 'react';
import {
	FileUploadInput,
	FileUploadLabel,
	FileUploadText,
	FileUploadWrapper,
	RemoveFileIcon,
	UploadIcon,
} from './FileUploader.style';

function FileUploader() {
	const inputRef = useRef();
	const [file, setFile] = useState(undefined);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		console.log(file);
		setFile(file);
	};

	return (
		<FileUploadWrapper onClick={() => inputRef.current.click()}>
			<FileUploadInput
				accept='.jsonl'
				type='file'
				onChange={handleFileChange}
				ref={inputRef}
				disabled={file}
			/>
			<FileUploadLabel htmlFor='file-upload'>
				{file ? (
					<RemoveFileIcon
						onClick={() => {
							inputRef.current.value = null;
							setFile(undefined);
						}}
					/>
				) : (
					<UploadIcon />
				)}
				<FileUploadText>
					{file ? 'File uploaded' : 'Upload file'}
				</FileUploadText>
			</FileUploadLabel>
		</FileUploadWrapper>
	);
}

export default FileUploader;
