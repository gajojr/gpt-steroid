import styled from 'styled-components';
import { TbPencilMinus, TbSend } from 'react-icons/tb';

export const QuestionMessageWrapper = styled.article`
	color: #fff;
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20px;
	background-color: #343541;
	align-items: center;
	flex-direction: column;
`;

export const ProfileAndText = styled.div`
	width: 58%;
	display: flex;
	flex-direction: row;
	aligni-tems: center;
`;

export const ProfileImg = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
`;

export const MessageContent = styled.div`
	width: 100%;
	font-size: 16px;
	line-height: 26px;
	white-space: pre-wrap;

	${
		'' /* code {
		background-color: #f8f8f8;
		border: 1px solid #ccc;
		font-family: Consolas, 'Courier New', monospace;
		font-size: 1rem;
		padding: 0.2rem 0.5rem;
		color: red;
	} */
	}
`;

export const EditQuestion = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-self: center;
	width: 150px;
	background-color: #434654;
	padding: 10px;
	margin-top: 20px;
	border-radius: 12px;
	border: 1px solid #fff;
	transition: 0.5s background-color;

	&:hover {
		cursor: pointer;
		background-color: #202123;
	}
`;

export const EditQuestionText = styled.span`
	font-size: 0.9rem;
`;

export const EditQuestionBtn = styled(TbPencilMinus)`
	font-size: 18px;
`;

export const LoadingText = styled.span`
	margin-top: 15px;

	&:after {
		content: '';
		animation: ellipsis 1.5s infinite;
		display: inline-block;
		width: 0.5em;
		text-align: left;
	}

	@keyframes ellipsis {
		0% {
			content: '.';
		}
		33% {
			content: '..';
		}
		66% {
			content: '...';
		}
	}
`;

export const EditOptions = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

export const SaveEditBtn = styled.button`
	background-color: #47b248;
	color: #fff;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	font-size: 1rem;
	cursor: pointer;

	&:hover {
		background-color: #239123;
	}
`;

export const CancelEditBtn = styled.button`
	margin-left: 15px;
	background-color: #db4437;
	color: #fff;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	font-size: 1rem;
	margin-right: 1rem;
	cursor: pointer;

	&:hover {
		background-color: #b02e24;
	}
`;
