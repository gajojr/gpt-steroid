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
				<Feature>Create fine tune file via gui</Feature>
				<Feature>Open source</Feature>
				<Feature>Local setup</Feature>
				<Feature>32K token output</Feature>
				<Feature>AutoGPT self promting (New)</Feature>
				<Feature>Internet access (In progress)</Feature>
			</FeaturesList>
		</StarterScreenWrapper>
	);
};

export default StarterScreen;
