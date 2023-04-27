import React from 'react';
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
							<ItemWrapper key={chat.id}>
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