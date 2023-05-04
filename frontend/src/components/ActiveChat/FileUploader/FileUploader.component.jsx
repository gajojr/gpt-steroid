import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
	ConfirmUploadIcon,
	FileUploadInput,
	FileUploadLabel,
	FileUploadText,
	FileUploadWrapper,
	RemoveFileIcon,
	Spinner,
	UploadIcon,
} from './FileUploader.style';
import db, { fileEventEmitter } from '../../../db';

function FileUploader() {
	const inputRef = useRef();
	const [file, setFile] = useState(undefined);
	const [uploadPending, setUploadPending] = useState(false);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
	};

	const confirmFileUpload = async () => {
		try {
			setUploadPending(true);
			const formData = new FormData();
			formData.append('file', file);
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/upload-file`,
				formData,
				{
					'Content-Type': 'multipart/form-data',
				}
			);
			const fileId = response.data.fileId;
			const tuneId = response.data.tuneId;
			const fineTunedModel = response.data.fineTunedModel;

			await db.fileUploads.add({
				fileName: file.name,
				fileId,
				tuneId,
				uploadDate: new Date(),
				fineTunedModel
			});

			fileEventEmitter.emit('fileAdded');

			setUploadPending(false);
			inputRef.current.value = null;
			setFile(undefined);

			Swal.fire({
				icon: 'success',
				title: 'File uploaded successfully',
				showConfirmButton: false,
				timer: 1500,
				backdrop: 'rgba(0, 0, 0, 0.4)',
				customClass: {
					title: 'swal2-title-style',
					popup: 'swal2-popup-style',
				},
			});
		} catch (error) {
			setUploadPending(false);
			inputRef.current.value = null;
			setFile(undefined);
			Swal.fire({
				icon: 'error',
				title: 'File upload failed',
				text: error.message,
				showConfirmButton: true,
				// timer: 1500,
				backdrop: 'rgba(0, 0, 0, 0.4)',
				customClass: {
					title: 'swal2-title-style',
					popup: 'swal2-popup-style',
				},
			});
		}
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
					<>
						<RemoveFileIcon
							disabled={uploadPending}
							onClick={() => {
								inputRef.current.value = null;
								setFile(undefined);
							}}
						/>
						{uploadPending ? (
							<Spinner />
						) : (
							<ConfirmUploadIcon onClick={confirmFileUpload} />
						)}
					</>
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
