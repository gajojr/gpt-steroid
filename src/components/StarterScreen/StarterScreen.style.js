import styled from 'styled-components';

export const StarterScreenWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #343541;
`;

export const Title = styled.h1`
	color: #555869;
	margin-block-end: 0;
`;

export const Subtitle = styled.span`
	background-color: #fae69e;
	color: #927202;
	font-size: 0.9rem;
	padding: 5px 8px;
	border-radius: 8px;
	margin-left: 5px;
	position: relative;
	top: -10px;
	left: 5px;
`;

export const FeaturesList = styled.ol`
	padding-inline-start: 0;
`;

export const Feature = styled.li`
	color: #fff;
	font-size: 1.1rem;
	margin-top: 5px;
`;
