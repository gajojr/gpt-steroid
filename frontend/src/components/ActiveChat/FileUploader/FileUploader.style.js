import styled, { css } from 'styled-components';
import { TbUpload } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';

export const FileUploadWrapper = styled.div`
	position: fixed;
	bottom: 70px;
	right: 30px;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #1c1e26;
	padding: 10px;
	border-radius: 10px;
`;

export const FileUploadInput = styled.input`
	display: none;
`;

export const FileUploadLabel = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	color: #fff;
	margin-right: 10px;
`;

export const FileUploadText = styled.span`
	margin-left: 10px;
`;

const iconStyle = css`
	font-size: 18px;
	color: #acacbd;

	&:hover {
		color: #fff;
	}
`;

export const UploadIcon = styled(TbUpload)`
	${iconStyle};
`;

export const RemoveFileIcon = styled(RiDeleteBin6Line)`
	${iconStyle};
`;

export const ConfirmUploadIcon = styled(TiTick)`
	${iconStyle};
	margin-left: 10px;
`;

export const Spinner = styled.div`
	margin-left: 10px;
	border: 3px solid #f3f3f3;
	border-top: 3px solid #3498db;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
