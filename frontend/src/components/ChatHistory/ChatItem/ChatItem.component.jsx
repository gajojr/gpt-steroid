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

const ChatItem = ({ chat, setChats, chats }) => {
	const dispatch = useDispatch();
	const [editable, setEditable] = useState(false);
	const [editableChatId, setEditableChatId] = useState(null);
	const [editableChatName, setEditableChatName] = useState('');
	const [shouldBlur, setShouldBlur] = useState(true);
	const chatNameRef = useRef(null);

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
		<ItemWrapper onClick={() => dispatch(selectChatId(chat.id))}>
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
