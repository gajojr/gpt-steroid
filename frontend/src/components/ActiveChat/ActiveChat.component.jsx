import React, { useEffect, useRef, useState } from 'react';
import db from '../../db';
// import messages from '../../mocks/messages';
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
	const textareaRef = useRef(null);
	const [currentPromt, setCurrentPromt] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		(async () => {
			const messages = await db.messages
				.where('chatId')
				.equals(chatId)
				.toArray();

			setMessages(messages);
		})();
	}, [chatId]);

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
					ref={textareaRef}
					placeholder='Send a message.'
					value={currentPromt}
					onChange={(e) => {
						setCurrentPromt(e.target.value);
						textareaRef.current.style.height = 'auto';
						textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
					}}
				/>
				<SubmitQuestionIcon
					color={currentPromt.length ? '#8E8E9F' : '#5F606F'}
					enableBackground={currentPromt.length}
				/>
			</NewQuestionInputWrapper>
		</ActiveChatWrapper>
	);
};

export default ActiveChat;
