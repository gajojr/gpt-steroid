import styled, { css } from 'styled-components';
import { TbPencilMinus, TbSend } from 'react-icons/tb';

export const ActiveChatWrapper = styled.section`
	width: 100%;
	height: 100vh;
	background-color: #343541;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MessagesList = styled.ul`
	padding-inline-start: 0;
	margin-block-start: 0;
	margin-block-end: 0;
	width: 100%;
`;

const messageStyle = css`
	color: #fff;
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20px;
`;

export const QuestionMessage = styled.article`
	${messageStyle};
	background-color: #343541;
	flex-direction: column;
`;

export const AnswerMessage = styled.article`
	${messageStyle};
	background-color: #434654;
`;

export const MessageContent = styled.div`
	width: 80%;
	text-align: center;
`;

export const EditQuestion = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-self: center;
	width: 180px;
	background-color: #434654;
	padding: 10px;
	margin-top: 20px;
	border-radius: 12px;
	border: 1px solid #fff;

	&:hover {
		cursor: pointer;
	}
`;

export const EditQuestionText = styled.span`
	font-size: 1.2rem;
`;

export const EditQuestionBtn = styled(TbPencilMinus)`
	font-size: 24px;
`;

export const NewQuestionInputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 40px;
	width: 60%;
	background-color: #40414f;
	padding: 15px;
	border-radius: 10px;
`;

export const NewQuestionInput = styled.textarea`
	width: 94%;
	background-color: transparent;
	border: none;
	resize: none;
	color: #fff;
	font-size: 1rem;
	font-family: 'Inter', sans-serif;
`;

export const SubmitQuestionIcon = styled(TbSend)`
	font-size: 24px;
	align-self: center;

	&:hover {
		cursor: pointer;
	}
`;
