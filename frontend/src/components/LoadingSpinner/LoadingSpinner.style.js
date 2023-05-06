import styled from 'styled-components';

export const SpinnerWrapper = styled.div `
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Spinner = styled.div `
  	border: 16px solid #f3f3f3; 
  	border-top: 16px solid #3498db; 
  	border-radius: 50%;
  	width: 120px;
  	height: 120px;
  	animation: spin 2s linear infinite;
	  
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;