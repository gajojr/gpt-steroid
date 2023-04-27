import styled, { css } from 'styled-components';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { TbPencilMinus } from 'react-icons/tb';
import { BsTrash3 } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';

export const ChatHistoryWrapper = styled.div `
	width: 250px;
	height: 100vh;
	background-color: #202123;
	color: #fff;
	font-family: 'Inter', sans-serif;
	padding: 15px;
`;

export const SectionTitle = styled.h2 `
	
`;

export const AddNewChatBtn = styled.button `
	width: 100%;
	border-radius: 12px;
	border: none;
	padding: 5px 0;

	&:hover {
		cursor: pointer;
	}
`;

export const ChatList = styled.ul `
    margin-block-start: .5em;
	list-style-type: none;
	width: 100%;
	padding-inline-start: 0;
`;

export const ItemWrapper = styled.li `
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const ChatName = styled.h4 `
	width: 50%; 
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const iconStyle = css `
	font-size: 24px;	

	&:hover {
		cursor: pointer;
	}
`;

export const ChatIcon = styled(MdOutlineChatBubbleOutline)
`
	${iconStyle};

	&:hover {
		cursor: auto;
	}
`;

export const PencilIcon = styled(TbPencilMinus)
`
	${iconStyle};
`;

export const TrashIcon = styled(BsTrash3)
`
	${iconStyle};
`;

export const PlusIcon = styled(GoPlus)
`
	${iconStyle};
	font-size: 32px;	
`;