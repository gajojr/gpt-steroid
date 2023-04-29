import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
	ChatHistoryWrapper,
	ChatList,
	SectionTitle,
	ItemWrapper,
	ChatName,
	ChatIcon,
	PencilIcon,
	TrashIcon,
	AddNewChatBtn,
	PlusIcon,
	TickIcon,
} from './ChatHistory.style';
import { selectChatId } from '../../redux/reducers/Chat';
import db from '../../db';

const mockChats = [
	{
		id: 1,
		name: 'random chat 1413431423 dfdsa',
	},
	{
		id: 2,
		name: 'random chat',
	},
	{
		id: 3,
		name: 'random chat',
	},
];

const ChatHistory = () => {
	const dispatch = useDispatch();
	const [chats, setChats] = useState([]);
	const [editable, setEditable] = useState(false);
	const [editableChatId, setEditableChatId] = useState(null);
	const [editableChatName, setEditableChatName] = useState('');
	const [shouldBlur, setShouldBlur] = useState(true);
	const chatNameRef = useRef(null);

	useEffect(() => {
		db.chats.toArray().then((chats) => setChats(chats));
	}, []);

	useEffect(() => {
		if (editable && chatNameRef.current) {
			chatNameRef.current.focus();
		}
	}, [editable]);

	const handleAddChatClick = () => {
		Swal.fire({
			title: 'Enter chat name',
			input: 'text',
			inputPlaceholder: 'Enter your chat name',
			confirmButtonText: 'Create chat',
			confirmButtonColor: '#202123',
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			allowOutsideClick: false,
			inputValidator: (value) => {
				if (!value) {
					return 'Please enter a chat name';
				}
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				const chatId = await db.chats.add({
					name: result.value,
					creationDate: new Date(),
				});
				dispatch(selectChatId(chatId));
			}
		});
	};

	async function handleRemoveChatClick(chatId) {
		try {
			const result = await Swal.fire({
				title: 'Are you sure you want to delete this chat?',
				text: 'This will also delete all messages associated with this chat.',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#dc3545',
				cancelButtonColor: '#6c757d',
				confirmButtonText: 'Delete chat',
				cancelButtonText: 'Cancel',
			});

			if (result.isConfirmed) {
				await db.chats.where({ id: chatId }).delete();
				await db.messages.where({ chatId: chatId }).delete();
				setChats(chats.filter((chat) => chat.id !== chatId));
				Swal.fire(
					'Deleted!',
					'Chat and associated messages have been deleted.',
					'success'
				);
			}
		} catch (err) {
			console.error(err);
			Swal.fire('Error', 'Unable to delete chat and messages', 'error');
		}
	}

	return (
		<ChatHistoryWrapper>
			<AddNewChatBtn onClick={handleAddChatClick}>
				<PlusIcon />
				<span>New chat</span>
			</AddNewChatBtn>
			<SectionTitle>Chat History</SectionTitle>
			<ChatList>
				{chats.map((chat) => {
					return (
						<ItemWrapper
							key={chat.id}
							onClick={() => dispatch(selectChatId(chat.id))}
						>
							<ChatIcon />
							<ChatName
								ref={chatNameRef}
								contentEditable={editable && chat.id === editableChatId}
								suppressContentEditableWarning={true}
								onInput={(e) => setEditableChatName(e.target.innerText)}
								onBlur={() => {
									if (shouldBlur) {
										setTimeout(() => {
											setEditable(false);
											setEditableChatId(null);
										}, 0);
									}
									setShouldBlur(true);
								}}
							>
								{chat.name}
							</ChatName>
							{editable && chat.id === editableChatId ? (
								<TickIcon
									onClick={async () => {
										await db.chats.update(chat.id, { name: editableChatName });
										setEditable(false);
										setEditableChatId(null);
										setEditableChatName('');
									}}
									onMouseDown={() => setShouldBlur(false)}
								/>
							) : (
								<PencilIcon
									onClick={() => {
										setEditable(true);
										setEditableChatId(chat.id);
									}}
								/>
							)}
							<TrashIcon onClick={() => handleRemoveChatClick(chat.id)} />
						</ItemWrapper>
					);
				})}
			</ChatList>
		</ChatHistoryWrapper>
	);
};

export default ChatHistory;
