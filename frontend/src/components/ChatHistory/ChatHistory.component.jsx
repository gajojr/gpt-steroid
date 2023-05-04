import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
	ChatHistoryWrapper,
	ChatList,
	SectionTitle,
	AddNewChatBtn,
	PlusIcon,
	TunesList,
} from './ChatHistory.style';
import { selectChatId } from '../../redux/reducers/Chat';
import db from '../../db';
import ChatItem from './ChatItem/ChatItem.component';
import axios from 'axios';

const ChatHistory = () => {
	const dispatch = useDispatch();
	const [chats, setChats] = useState([]);
	const [fineTunes, setFineTunes] = useState([]);

	useEffect(() => {
		db.chats.toArray().then((chats) => setChats(chats));

		(async function () {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/fine-tunes`
			);
			console.log(res);
			setFineTunes(res.data);
		})();
	}, []);

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
				db.chats.toArray().then((chats) => setChats(chats));
			}
		});
	};

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
						<ChatItem
							key={chat.id}
							chat={chat}
							chats={chats}
							setChats={setChats}
						/>
					);
				})}
			</ChatList>
			<TunesList></TunesList>
		</ChatHistoryWrapper>
	);
};

export default ChatHistory;
