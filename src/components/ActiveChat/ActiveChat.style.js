import styled, { css } from 'styled-components';
import { TbPencilMinus, TbSend } from 'react-icons/tb';
import { MdContentCopy } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { AiOutlineArrowDown } from 'react-icons/ai';

export const ActiveChatWrapper = styled.section`
	width: 100%;
	max-height: 100vh;
	overflow-y: scroll;
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
	align-items: center;
	flex-direction: column;
`;

export const AnswerMessage = styled.article`
	${messageStyle};
	background-color: #434654;
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

	code {
		background-color: #f8f8f8;
		border: 1px solid #ccc;
		font-family: Consolas, 'Courier New', monospace;
		font-size: 1rem;
		padding: 0.2rem 0.5rem;
		color: red;
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

export const NewQuestionInputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 40px;
	width: 54%;
	background-color: #40414f;
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 0 transparent, 0 0 transparent, 0 0 15px rgba(0, 0, 0, 0.1);
	box-shadow: 0 0 transparent, 0 0 transparent, 0 0 15px #0000001a;
	border: 0.5px solid #000;
	margin-bottom: 20px;
	position: fixed;
	bottom: 50px;
`;

export const NewQuestionInput = styled.textarea`
	width: 97%;
	background-color: transparent;
	border: none;
	resize: none;
	color: #fff;
	font-size: 1rem;
	font-family: 'Inter', sans-serif;
	max-height: 200px;
	outline: none;

	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #8e8e9f;
	}

	&:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #8e8e9f;
	}

	&::-ms-input-placeholder {
		/* Microsoft Edge */
		color: #8e8e9f;
	}
`;

export const SubmitQuestionIcon = styled(TbSend)`
	font-size: 24px;
	align-self: end;
	box-sizing: content-box;

	&:hover {
		cursor: pointer;
		background-color: ${(props) =>
			props.enableBackground ? '#202123' : 'none'};
		border-radius: ${(props) => (props.enableBackground ? '5px' : '')};
		padding: ${(props) => (props.enableBackground ? '2px' : '')};
	}
`;

const iconStyle = css`
	color: #acacbd;
	font-size: 26px;
	margin-left: 10px;
	transition: all 0.5s;

	&:hover {
		cursor: pointer;
		color: #fff;
		background-color: #202123;
		font-size: 28px;
		padding: 5px;
		border-radius: 5px;
	}
`;

export const CopyIcon = styled(MdContentCopy)`
	${iconStyle};
`;

export const TickIcon = styled(TiTick)`
	${iconStyle};

	&:hover {
		cursor: auto;
		padding: 0;
		border-radius: 0;
	}
`;

export const DownArrow = styled(AiOutlineArrowDown)`
	color: #acacbd;
	background-color: #202123;
	font-size: 30px;
	padding: 5px;
	border-radius: 50%;
	position: fixed;
	bottom: 150px;
	right: 20px;

	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;
