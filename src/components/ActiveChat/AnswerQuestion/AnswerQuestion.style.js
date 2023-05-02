import styled, { css } from 'styled-components';
import { MdContentCopy } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

export const AnswerMessage = styled.article`
	color: #fff;
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20px;
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
	width: 56%;
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
