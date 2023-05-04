import React from 'react';
import {
	ItemWrapper,
	FileName,
	TrashIcon,
} from './FineTuneItem.style';
import { useDispatch } from 'react-redux';
import db from '../../../db';
import Swal from 'sweetalert2';
import { selectFineTunedModel } from '../../../redux/reducers/FineTune';
import axios from 'axios';

const FineTuneItem = ({ selected, fineTune, setFineTunes, fineTunes }) => {
	const dispatch = useDispatch();

	async function handleRemoveChatClick(tuneId) {
		try {
			const result = await Swal.fire({
				title: 'Are you sure you want to delete this fine tune?',
				text: 'This will delete fine tune both here and on your openai api',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#dc3545',
				cancelButtonColor: '#6c757d',
				confirmButtonText: 'Delete fine tune',
				cancelButtonText: 'Cancel',
			});

			if (result.isConfirmed) {
				await db.fileUploads.where({ id: tuneId }).delete();
				setFineTunes(fineTunes.filter((fineTune) => fineTune.id !== tuneId));
				await axios.delete(`${process.env.REACT_APP_SERVER_URL}/fine-tune`, {
					data: {
						model: fineTune.fineTunedModel
					}
				});
			}
		} catch (err) {
			console.error(err);
			Swal.fire('Error', 'Unable to delete fine tune', 'error');
		}
	}

	return (
		<ItemWrapper onClick={() => dispatch(selectFineTunedModel(fineTune.fineTunedModel))}>
			<FileName selected={selected}>
				{fineTune.fileName}
			</FileName>
			<TrashIcon onClick={() => handleRemoveChatClick(fineTune.id)} />
		</ItemWrapper>
	);
};

export default FineTuneItem;
