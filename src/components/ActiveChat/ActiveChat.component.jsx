import React, { useEffect, useRef, useState } from 'react';
import db from '../../db';
// import messages from '../../mocks/messages';
import {
	ActiveChatWrapper,
	MessagesList,
	NewQuestionInputWrapper,
	NewQuestionInput,
	SubmitQuestionIcon,
	DownArrow,
} from './ActiveChat.style';
import askQuestion from '../../chat/askQuestion';
import QuestionMessage from './QuestionMessage/QuestionMessage.component';
import AnswerQuestion from './AnswerQuestion/AnswerQuestion.component';

const ActiveChat = ({ chatId }) => {
	const activeChatRef = useRef(null);
	const textareaRef = useRef(null);
	const [currentPromt, setCurrentPromt] = useState('');
	const [messages, setMessages] = useState([]);
	const [isAtChatEnd, setIsAtChatEnd] = useState(true);

	useEffect(() => {
		const chatSection = activeChatRef.current;
		const handleScroll = () => {
			setIsAtChatEnd(
				chatSection.scrollHeight - chatSection.scrollTop ===
					chatSection.clientHeight
			);
		};
		chatSection.addEventListener('scroll', handleScroll);
		return () => {
			chatSection.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		// scroll to the bottom of the chat after every message
		activeChatRef.current.scrollTop = activeChatRef.current.scrollHeight;
	}, [messages]);

	useEffect(() => {
		(async () => {
			const messages = await db.messages
				.where('chatId')
				.equals(chatId)
				.toArray();

			setMessages(messages);
		})();
	}, [chatId]);

	const addNewQuestion = async () => {
		await db.messages.add({
			chatId,
			creationDate: new Date(),
			messageType: 'question',
			messageContent: currentPromt,
		});

		const messages = await db.messages.where('chatId').equals(chatId).toArray();
		setMessages(messages);

		setCurrentPromt('');
		const answer = await askQuestion(currentPromt);

		await db.messages.add({
			chatId,
			creationDate: new Date(),
			messageType: 'answer',
			messageContent: answer,
		});

		const newMessages = await db.messages
			.where('chatId')
			.equals(chatId)
			.toArray();
		setMessages(newMessages);
	};

	const handleScrollDown = () => {
		activeChatRef.current.scrollTo({
			top: activeChatRef.current.scrollHeight,
			behavior: 'smooth',
		});
	};

	return (
		<ActiveChatWrapper ref={activeChatRef}>
			<MessagesList>
				{messages.map((message, idx) =>
					message.messageType === 'question' ? (
						<QuestionMessage
							key={message.id}
							chatId={chatId}
							message={message}
							answerLoading={idx === messages.length - 1}
							setMessages={setMessages}
						/>
					) : (
						<AnswerQuestion
							key={message.id}
							message={message}
						/>
					)
				)}
				<div
					style={{ width: '100%', backgroundColor: '#333641', height: 200 }}
				></div>
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
					onKeyDown={(e) => {
						if (e.keyCode === 13 && !e.shiftKey) {
							addNewQuestion();
						}
					}}
				/>
				<SubmitQuestionIcon
					color={currentPromt.length ? '#8E8E9F' : '#5F606F'}
					enableBackground={currentPromt.length}
					onClick={() => {
						if (currentPromt.length) {
							addNewQuestion();
						}
					}}
				/>
			</NewQuestionInputWrapper>
			{!isAtChatEnd && <DownArrow onClick={handleScrollDown} />}
		</ActiveChatWrapper>
	);
};

export default ActiveChat;
