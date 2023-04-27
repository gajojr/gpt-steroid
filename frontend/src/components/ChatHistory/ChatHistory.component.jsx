import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	PlusIcon
} from './ChatHistory.style';
import { selectChatId } from '../../redux/reducers/Chat';

const mockChats = [
	{
		id: 1,
		name: 'random chat 1413431423 dfdsa'
	},
	{
		id: 2,
		name: 'random chat'
	},
	{
		id: 3,
		name: 'random chat'
	},
]

const ChatHistory = () => {
	const dispatch = useDispatch();

	return (
		<ChatHistoryWrapper>
			<AddNewChatBtn>
				<PlusIcon />
			</AddNewChatBtn>
			<SectionTitle>Chat History</SectionTitle>
			<ChatList>
				{
					mockChats.map(chat => {
						return (
							<ItemWrapper key={chat.id} onClick={() => dispatch(selectChatId(chat.id))}>
								<ChatIcon />
								<ChatName>{chat.name}</ChatName>
								<PencilIcon />
								<TrashIcon />
							</ItemWrapper>
						)
					})
				}
			</ChatList>
		</ChatHistoryWrapper>
	);
}

export default ChatHistory;