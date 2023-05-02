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
				<Feature>Bigger input and output (up to 32K tokens)</Feature>
				<Feature>File uploads (fine tuning)</Feature>
				<Feature>Open source</Feature>
				<Feature>Local setup</Feature>
			</FeaturesList>
		</StarterScreenWrapper>
	);
};

export default StarterScreen;
