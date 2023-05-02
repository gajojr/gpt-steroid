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
	CopyIcon,
	TickIcon,
} from './ActiveChat.style';
import askQuestion from '../../chat/askQuestion';

const ActiveChat = ({ chatId }) => {
	const activeChatRef = useRef(null);
	const textareaRef = useRef(null);
	const [currentPromt, setCurrentPromt] = useState('');
	const [messages, setMessages] = useState([]);
	const [showTick, setShowTick] = useState(false);
	const [copiedMessageId, setCopiedMessageId] = useState(null);

	const copyToClipboard = (message) => {
		navigator.clipboard.writeText(message.messageContent);
		setCopiedMessageId(message.id);
		setShowTick(true);
		setTimeout(() => {
			setShowTick(false);
			setCopiedMessageId(null);
		}, 2000);
	};

	// useEffect(() => {
	// 	if (showTick) {
	// 		const timer = setTimeout(() => setShowTick(false), 2000);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [showTick]);

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
		console.log(newMessages);
		setMessages(newMessages);
	};

	return (
		<ActiveChatWrapper ref={activeChatRef}>
			<MessagesList>
				{messages.map((message) =>
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
							{showTick && copiedMessageId === message.id ? (
								<TickIcon />
							) : (
								<CopyIcon onClick={() => copyToClipboard(message)} />
							)}
						</AnswerMessage>
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
		</ActiveChatWrapper>
	);
};

export default ActiveChat;
