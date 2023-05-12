import React, { useEffect, useRef, useState } from 'react';
import {
	ItemWrapper,
	ChatIcon,
	ChatName,
	TickIcon,
	PencilIcon,
	TrashIcon,
} from './ChatItem.style';
import { useDispatch } from 'react-redux';
import { selectChatId } from '../../../redux/reducers/Chat';
import db from '../../../db';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatItem = ({ chat, setChats, chats }) => {
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [editableChatId, setEditableChatId] = useState(null);
	const [editableChatName, setEditableChatName] = useState('');
	const [shouldBlur, setShouldBlur] = useState(true);
	const chatNameRef = useRef(null);
	const activeChatId = useSelector(state => state.chat.currentChatId);

	useEffect(() => {
		if (editable && chatNameRef.current) {
			chatNameRef.current.focus();
		}
	}, [editable]);

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
				await axios.delete(`${process.env.REACT_APP_SERVER_URL}/chat`, {
					data: {
						chatId
					}
				});
				await db.chats.where({ id: chatId }).delete();
				await db.messages.where({ chatId }).delete();
				setChats(chats.filter((chat) => chat.id !== chatId));
				dispatch(selectChatId(null));
				// window.location.reload();
			}
		} catch (err) {
			console.error(err);
			Swal.fire('Error', 'Unable to delete chat and messages', 'error');
		}
	}

	return (
		<ItemWrapper
			active={activeChatId === chat.id}
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
};

export default ChatItem;
