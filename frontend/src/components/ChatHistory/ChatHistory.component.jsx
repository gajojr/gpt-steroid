import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import Swal from 'sweetalert2';
import {
	ChatHistoryWrapper,
	ChatList,
	SectionTitle,
	AddNewChatBtn,
	PlusIcon,
	TunesList,
	GuidesList,
	StyledGuideLink,
	CreateTuneLink
} from './ChatHistory.style';
import { selectChatId } from '../../redux/reducers/Chat';
import db, { fileEventEmitter } from '../../db';
import ChatItem from './ChatItem/ChatItem.component';
import FineTuneItem from './FineTuneItem/FineTuneItem.component';
import { useSelector } from 'react-redux';

const ChatHistory = () => {
	const dispatch = useDispatch();
	const [chats, setChats] = useState([]);
	const [fineTunes, setFineTunes] = useState([]);
	const selectedTunedModel = useSelector(state => state.fineTune.currentFineTunedModel);

	useEffect(() => {
		db.chats.toArray().then((chats) => setChats(chats));
		db.fileUploads.toArray().then((uploads) => setFineTunes(uploads));
	}, []);

	useEffect(() => {
		fileEventEmitter.on('fileAdded', () => {
			db.fileUploads.toArray().then((uploads) => setFineTunes(uploads));
		});

		fileEventEmitter.on('fileDeleted', () => {
			db.fileUploads.toArray().then((uploads) => setFineTunes(uploads));
		});

		// clean up event listeners
		return () => {
			fileEventEmitter.removeAllListeners();
		};
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
				if (!result.value?.length) {
					return;
				}
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
			<CreateTuneLink to='/create-fine-tune'>Create fine tune</CreateTuneLink>
			<SectionTitle>Guides</SectionTitle>
			<GuidesList>
				<li>
					<StyledGuideLink to="/guides/fine-tuning-guide">Fine tuning</StyledGuideLink>
				</li>
				<li>
					<StyledGuideLink to="/guides/large-output-guide">Large output</StyledGuideLink>
				</li>
			</GuidesList>
			<SectionTitle>Chat History</SectionTitle>
			{
				chats.length ?
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
					</ChatList> :
					<p>No chats created</p>
			}
			<SectionTitle>Fine tunes</SectionTitle>
			{
				fineTunes.length ?
					<TunesList>
						{fineTunes.map((fineTune) => {
							return (
								<FineTuneItem
									key={fineTune.id}
									selected={selectedTunedModel === fineTune.fineTunedModel}
									fineTune={fineTune}
									fineTunes={fineTunes}
									setFineTunes={setFineTunes}
								/>
							);
						})}
					</TunesList> :
					<p>No tunes created</p>
			}
		</ChatHistoryWrapper>
	);
};

export default ChatHistory;
