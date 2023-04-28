import React, { useState } from 'react';
import db from '../../db';
import messages from '../../mocks/messages';
import {
	ActiveChatWrapper,
	AnswerMessage,
	MessagesList,
	QuestionMessage,
	MessageContent,
	EditQuestion,
	EditQuestionBtn,
	EditQuestionText,
	NewQuestionInputWrapper,
	NewQuestionInput,
	SubmitQuestionIcon,
} from './ActiveChat.style';

const ActiveChat = ({ chatId }) => {
	const [currentPromt, setCurrentPromt] = useState('');
	// const [messages, setMessages] = useState([]);

	// useEffect(() => {
	// 	(async () => {
	// 		const messages = await db.messages
	// 			.where('chatId')
	// 			.equals(chatId)
	// 			.toArray();

	// 		setMessages(messages);
	// 	})();
	// }, [chatId]);

	return (
		<ActiveChatWrapper>
			<MessagesList>
				{messages.map((message, idx) =>
					message.messageType === 'question' ? (
						<QuestionMessage key={message.id}>
							<MessageContent>{message.messageContent}</MessageContent>
							<EditQuestion>
								<EditQuestionText>Edit question</EditQuestionText>
								<EditQuestionBtn />
							</EditQuestion>
						</QuestionMessage>
					) : (
						<AnswerMessage key={message.id}>
							<MessageContent>{message.messageContent}</MessageContent>
						</AnswerMessage>
					)
				)}
			</MessagesList>
			<NewQuestionInputWrapper>
				<NewQuestionInput
					value={currentPromt}
					onChange={(e) => {
						console.log(e.target.value);
						setCurrentPromt(e.target.value);
					}}
				/>
				<SubmitQuestionIcon
					color={currentPromt.length ? '#8E8E9F' : '#5F606F'}
				/>
			</NewQuestionInputWrapper>
		</ActiveChatWrapper>
	);
};

export default ActiveChat;
