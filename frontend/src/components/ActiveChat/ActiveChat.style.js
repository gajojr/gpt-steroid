import styled from 'styled-components';
import { TbSend } from 'react-icons/tb';
import { AiOutlineArrowDown } from 'react-icons/ai';

export const ActiveChatWrapper = styled.section `
	width: 100%;
	max-height: 100vh;
	overflow-y: scroll;
	background-color: #343541;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MessagesList = styled.ul `
	padding-inline-start: 0;
	margin-block-start: 0;
	margin-block-end: 0;
	width: 100%;
`;

export const NewQuestionInputWrapper = styled.div `
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

export const NewQuestionInput = styled.textarea `
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

export const SubmitQuestionIcon = styled(TbSend)
`
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

export const DownArrow = styled(AiOutlineArrowDown)
`
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