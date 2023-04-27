import React from 'react';
import ChatHistory from './components/ChatHistory/ChatHistory.component';
import StarterScreen from './components/StarterScreen/StarterScreen.component';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
	const activeChatId = useSelector(state => state.chat.currentChatId);

	return (
		<>
			<main>
				<ChatHistory />
				{
					activeChatId ?
						<div>{activeChatId}</div> :
						<StarterScreen />
				}
			</main>
			<footer></footer>
		</>
	)
}

export default App;