import React, { useState } from 'react';
import {
	AnswerMessage,
	CopyIcon,
	MessageContent,
	ProfileImg,
	TickIcon,
} from './AnswerQuestion.style';

const AnswerQuestion = ({ message }) => {
	const [showTick, setShowTick] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(message.messageContent);
		setShowTick(true);
		setTimeout(() => {
			setShowTick(false);
		}, 2000);
	};

	return (
		<AnswerMessage key={message.id}>
			<ProfileImg
				src='/gpt-profile.png'
				alt='user profile'
			/>
			<MessageContent>{message.messageContent}</MessageContent>
			{showTick ? <TickIcon /> : <CopyIcon onClick={copyToClipboard} />}
		</AnswerMessage>
	);
};

export default AnswerQuestion;
