import styled, { css } from 'styled-components';
import { BsTrash3 } from 'react-icons/bs';

export const ItemWrapper = styled.li `
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

export const FileName = styled.h4 `
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

const iconStyle = css `
	font-size: 18px;
	color: #c5c5d2;

	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;

export const TrashIcon = styled(BsTrash3)
`
	${iconStyle};
`;