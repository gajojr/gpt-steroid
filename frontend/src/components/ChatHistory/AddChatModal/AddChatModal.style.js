import styled, { css } from 'styled-components';

export const ModalContainer = styled.div `
	background-color: #fff;
	padding: 10px;
	border-radius: 4px;
	width: 250px;
	max-width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-self: center;
`;

export const ModalTitle = styled.h2 `
	font-family: 'Inter', sans-serif;
`;

export const ChatNameInput = styled.input `
	padding: 10px;
	border-radius: 4px;
	border: 1px solid #ccc;
	font-size: 16px;
	width: 100%;
	box-sizing: border-box;
`;

export const ButtonOptions = styled.div `
	display: flex;
	justify-content: space-between;
`;

export const ChatButtonOption = styled.button `
	background-color: ${(props) =>
		props.active ? '#202123' : '#6E7881'};
	color: #fff;
	border: none;
	border-radius: 6px;
	padding: 10px 20px;
	transition: background-color 0.3s ease;

	&:hover {
		cursor: pointer;
		background-color: #202123;
	}
`;

export const ChatTypeDescription = styled.p `
	font-family: 'Inter', sans-serif;
`;

const createAndCancelBtnStyle = css `
	margin-top: 10px;
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

export const CreateChatBtn = styled.button `
	${createAndCancelBtnStyle};
`;

export const CancelChatCreationBtn = styled.button `
	${createAndCancelBtnStyle};
	background-color: #db4437;

	&:hover {
		background-color: #b02e24;
	}
`;