import React from 'react';
import ChatHistory from './components/ChatHistory/ChatHistory.component';
import StarterScreen from './components/StarterScreen/StarterScreen.component';
import './App.css';
import { useSelector } from 'react-redux';
import ActiveChat from './components/ActiveChat/ActiveChat.component';
import Footer from './components/Footer/Footer.component';

function App() {
	const activeChatId = useSelector((state) => state.chat.currentChatId);

	return (
		<>
			<main>
				<ChatHistory />
				{activeChatId ? (
					<ActiveChat chatId={activeChatId} />
				) : (
					<StarterScreen />
				)}
			</main>
			<Footer />
		</>
	);
}

export default App;
