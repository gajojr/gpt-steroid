import styled, { css } from 'styled-components';
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';

export const ChatHistoryWrapper = styled.div `
	width: 320px;
	height: 100vh;
	background-color: #202123;
	color: #fff;
	font-family: 'Inter', sans-serif;
	padding: 15px;
`;

export const SectionTitle = styled.h2 `
	margin-block-end: 0;
`;

export const AddNewChatBtn = styled.button `
	width: 100%;
	border-radius: 10px;
	border: none;
	padding: 12px 15px;
	background-color: #202123;
	border: 1px solid #4d4d4f;
	color: #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
	transition: 0.4s background-color;

	&:hover {
		cursor: pointer;
		background-color: #525050;
	}
`;

export const CreateTuneLink = styled(Link)
`
	width: 100%;
	color: #fff;
	padding: 12px 15px;
	border: 1px solid #fff;
	border-radius: 12px;
	margin-top: 50px;
	text-decoration: none;
	transition: 0.4s background-color;

	&:hover {
		cursor: pointer;
		background-color: #525050;
	}
`;

export const ItemWrapper = styled.li `
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 10px 7px;
	border-radius: 7px;

	&:hover {
		background-color: #525050;
	}
`;

export const ChatName = styled.h4 `
	width: 50%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-block-start: 0;
	margin-block-end: 0;
	font-weight: 400;
	border: ${({ contentEditable }) =>
		contentEditable ? '1px solid white' : 'none'};
	border-radius: 5px;

	&:hover {
		cursor: pointer;
	}
`;

export const PlusIcon = styled(GoPlus)
`
	margin-right: 15px;
	font-size: 18px;
	color: #c5c5d2;

	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;

const listStyle = css `
	margin-block-start: 0.5em;
	list-style-type: none;
	width: 100%;
	max-height: 35vh;
	overflow-y: auto;
	padding-inline-start: 0;
	display: flex;
	flex-direction: column;
	align-items: center;

	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background-color: #434654;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #f1f1f1;
		border-radius: 10px;
	}
`;

export const ChatList = styled.ul `
	${listStyle};
`;

export const TunesList = styled.ul `
	${listStyle};
`;

export const GuidesList = styled.ul `
	${listStyle};
`;

export const StyledGuideLink = styled(Link)
`
	color: #fff;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

export const UncheckTuneOptionWrapper = styled.li `
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 10px 7px;
	border-radius: 7px;
	background-color: ${({ selected }) =>
		selected ? '#343541' : ''};

	&:hover {
		background-color: ${({ selected }) =>
		selected ? '#343541' : '#525050'};
	}
`;

export const UncheckTuneOption = styled.h4 `
	width: 90%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-decoration: ${({ selected }) =>
		selected ? 'underline' : 'none'};
	margin-block-start: 0;
	margin-block-end: 0;
	font-weight: 400;
	border-radius: 5px;

	&:hover {
		cursor: pointer;
	}
`;