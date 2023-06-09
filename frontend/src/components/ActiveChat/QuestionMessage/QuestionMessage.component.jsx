import React, { useEffect, useRef, useState } from 'react';
import {
	QuestionMessageWrapper,
	ProfileAndText,
	ProfileImg,
	MessageContent,
	EditQuestionText,
	EditQuestion,
	EditQuestionBtn,
	LoadingText,
	EditOptions,
	SaveEditBtn,
	CancelEditBtn,
} from './QuestionMessage.style';
import db from '../../../db';
import axios from 'axios';
import { store } from '../../../redux/store';

const QuestionMessage = ({ chatId, message, answerLoading, setMessages }) => {
	const questionInputRef = useRef(null);
	const [editable, setEditable] = useState(false);
	const [editPending, setEditPending] = useState(false);

	useEffect(() => {
		if (editable && questionInputRef.current) {
			questionInputRef.current.focus();
		}
	}, [editable]);

	const updateQuestion = async () => {
		setEditable(false);
		setEditPending(true);
		const question = questionInputRef.current.innerText;

		await db.messages.update(message.id, {
			messageContent: question
		});

		let answer;
		if (store.getState().fineTune.currentFineTunedModel) {
			answer = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/ask-question-tuned`,
				{
					chatId,
					question,
					model: store.getState().fineTune.currentFineTunedModel,
					messageId: message.id
				}
			);
		} else {
			answer = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/ask-question`,
				{
					question,
					chatId,
					messageId: message.id
				}
			);
		}

		await db.messages.update(message.id + 1, {
			messageContent: answer.data,
		});

		setEditPending(false);

		const newMessages = await db.messages
			.where('chatId')
			.equals(chatId)
			.toArray();
		setMessages(newMessages);
	};

	return (
		<QuestionMessageWrapper key={message.id}>
			<ProfileAndText>
				<ProfileImg
					src='/user-profile.jpeg'
					alt='user profile'
				/>
				<MessageContent
					ref={questionInputRef}
					contentEditable={editable}
					suppressContentEditableWarning={true}
				>
					{message.messageContent}
				</MessageContent>
			</ProfileAndText>
			{
				store.getState().chat.currentChatType === 'ChatGPT' ?
					(editable ? (
						<EditOptions>
							<SaveEditBtn onClick={updateQuestion}>Save</SaveEditBtn>
							<CancelEditBtn onClick={() => setEditable(false)}>
								Cancel
							</CancelEditBtn>
						</EditOptions>
					) : (
						<EditQuestion
							disabled={editPending || answerLoading}
							onClick={() => setEditable(true)}
						>
							<EditQuestionText>Edit question</EditQuestionText>
							<EditQuestionBtn />
						</EditQuestion>
					)) : null
			}
			{(answerLoading || editPending) && (
				<LoadingText>Loading the answer</LoadingText>
			)}
		</QuestionMessageWrapper>
	);
};

export default QuestionMessage;
