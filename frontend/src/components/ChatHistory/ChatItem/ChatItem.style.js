import styled, { css } from 'styled-components';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { TbPencilMinus } from 'react-icons/tb';
import { BsTrash3 } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';

export const ItemWrapper = styled.li`
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

export const ChatName = styled.h4`
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

const iconStyle = css`
	font-size: 18px;
	color: #c5c5d2;

	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;

export const ChatIcon = styled(MdOutlineChatBubbleOutline)`
	${iconStyle};

	&:hover {
		cursor: auto;
	}
`;

export const PencilIcon = styled(TbPencilMinus)`
	${iconStyle};
`;

export const TrashIcon = styled(BsTrash3)`
	${iconStyle};
`;

export const TickIcon = styled(TiTick)`
	${iconStyle};
`;
