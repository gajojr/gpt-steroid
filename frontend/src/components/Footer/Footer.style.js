import styled from 'styled-components';

export const FooterWrapper = styled.footer`
	background-color: #40414f;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
	position: fixed;
	bottom: 0;
	width: 100vw;
`;

export const FooterText = styled.p`
	margin: 0;
	padding: 0;
	font-size: 18px;
	display: flex;
`;

export const IconWrapper = styled.span`
	margin: 0 5px;
	font-size: 24px;
`;

export const RepoLink = styled.a`
	color: #fff;
	font-weight: bold;
`;
