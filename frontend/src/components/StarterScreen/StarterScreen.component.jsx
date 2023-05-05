import React from 'react';
import {
	StarterScreenWrapper,
	Subtitle,
	Title,
	FeaturesList,
	Feature,
} from './StarterScreen.style';

const StarterScreen = () => {
	return (
		<StarterScreenWrapper>
			<Title>
				ChatGPT
				<Subtitle>STEROID</Subtitle>
			</Title>
			<FeaturesList>
				<Feature>Fine tuning</Feature>
				<Feature>Open source</Feature>
				<Feature>Local setup</Feature>
				<Feature>32K token output (In progress)</Feature>
				<Feature>AutoGPT self promting (In progress)</Feature>
				<Feature>Internet access (In progress)</Feature>
			</FeaturesList>
		</StarterScreenWrapper>
	);
};

export default StarterScreen;
