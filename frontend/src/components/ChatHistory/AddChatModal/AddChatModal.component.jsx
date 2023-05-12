import React, { useState } from 'react';
import Modal from 'react-modal';
import { ButtonOptions, CancelChatCreationBtn, ChatButtonOption, ChatNameInput, ChatTypeDescription, CreateChatBtn, ModalContainer, ModalTitle } from './AddChatModal.style';
import db from '../../../db';
import { useDispatch } from 'react-redux';
import { selectChatId, selectChatType } from '../../../redux/reducers/Chat';

const modalStyles = {
	content: {
		width: '400px',
		height: 'fit-content',
		maxWidth: '100%',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
};

const AddChatModal = ({ setChats, modalVisible, setModalVisible }) => {
	const [selectedChatType, setSelectedChatType] = useState('ChatGPT');
	const [chatName, setChatName] = useState('');
	const dispatch = useDispatch();

	const handleModalClose = () => {
		setChatName('');
		setModalVisible(false);
	};

	const handleChatTypeChange = (chatType) => {
		setSelectedChatType(chatType);
	};

	const handleChatNameChange = (event) => {
		setChatName(event.target.value);
	};

	const handleCreateChat = async () => {
		if (!chatName) {
			return;
		}

		const chatId = await db.chats.add({
			name: chatName,
			chatType: selectedChatType,
			creationDate: new Date(),
		});
		dispatch(selectChatId(chatId));
		dispatch(selectChatType(selectedChatType));
		db.chats.toArray().then((chats) => setChats(chats));

		setModalVisible(false);
		setChatName('');
	};

	return (
		<Modal
			isOpen={modalVisible}
			onRequestClose={handleModalClose}
			contentLabel="Create Chat Modal"
			ariaHideApp={false}
			style={modalStyles}
		>
			<ModalContainer>
				<ModalTitle>Enter chat details</ModalTitle>
				<ChatNameInput
					type="text"
					placeholder="Enter chat name"
					value={chatName}
					onChange={handleChatNameChange}
				/>
				<ModalTitle>Choose chat mode</ModalTitle>
				<ButtonOptions>
					<ChatButtonOption
						onClick={() => handleChatTypeChange('ChatGPT')}
						active={selectedChatType === 'ChatGPT'}
					>
						ChatGPT
					</ChatButtonOption>
					<ChatButtonOption
						onClick={() => handleChatTypeChange('AutoGPT')}
						active={selectedChatType === 'AutoGPT'}
					>
						AutoGPT
					</ChatButtonOption>
				</ButtonOptions>
				<ChatTypeDescription>
					{
						selectedChatType === 'ChatGPT' ?
							'Allows fine tuning and 32K token output' :
							'Allows interaction with AutoGPT using GUI'
					}
				</ChatTypeDescription>
				<CreateChatBtn onClick={handleCreateChat}>Create Chat</CreateChatBtn>
				<CancelChatCreationBtn onClick={handleModalClose}>Cancel</CancelChatCreationBtn>
			</ModalContainer>
		</Modal>
	);
};

export default AddChatModal;