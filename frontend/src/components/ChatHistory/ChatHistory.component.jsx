import React, { useEffect, useState } from 'react';
import {
	ChatHistoryWrapper,
	ChatList,
	SectionTitle,
	AddNewChatBtn,
	PlusIcon,
	TunesList,
	GuidesList,
	StyledGuideLink,
	CreateTuneLink,
	UncheckTuneOption,
	UncheckTuneOptionWrapper,
} from './ChatHistory.style';
import db, { fileEventEmitter } from '../../db';
import ChatItem from './ChatItem/ChatItem.component';
import FineTuneItem from './FineTuneItem/FineTuneItem.component';
import { useSelector } from 'react-redux';
import AddChatModal from './AddChatModal/AddChatModal.component';
import { useDispatch } from 'react-redux';
import { selectFineTunedModel } from '../../redux/reducers/FineTune';

const ChatHistory = () => {
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
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
		setModalVisible(true);
	};

	return (
		<ChatHistoryWrapper>
			<AddNewChatBtn onClick={handleAddChatClick}>
				<PlusIcon />
				<span>New chat</span>
			</AddNewChatBtn>
			<AddChatModal
				setChats={setChats}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
			<CreateTuneLink to='/create-fine-tune'>Create fine tune</CreateTuneLink>
			<SectionTitle>Guides</SectionTitle>
			<GuidesList>
				<li>
					<StyledGuideLink to="/guides/fine-tuning-guide">Fine tuning</StyledGuideLink>
				</li>
				<li>
					<StyledGuideLink to="/guides/large-output-guide">Large output</StyledGuideLink>
				</li>
				<li>
					<StyledGuideLink to="/guides/autogpt-guide">AutoGPT</StyledGuideLink>
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
						<UncheckTuneOptionWrapper selected={selectedTunedModel === null} onClick={() => dispatch(selectFineTunedModel(null))}>
							<UncheckTuneOption selected={selectedTunedModel === null}>None(default output)</UncheckTuneOption>
						</UncheckTuneOptionWrapper>
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
