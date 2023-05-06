import React from 'react'
import {
	SpinnerWrapper,
	Spinner
} from './LoadingSpinner.style';

const LoadingSpinner = () => {
	return (
		<SpinnerWrapper>
			<Spinner />
		</SpinnerWrapper>
	)
}

export default LoadingSpinner;