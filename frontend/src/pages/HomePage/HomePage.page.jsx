import React from 'react';
import { useSelector } from 'react-redux';
import ChatHistory from '../../components/ChatHistory/ChatHistory.component';
import StarterScreen from '../../components/StarterScreen/StarterScreen.component';
import ActiveChat from '../../components/ActiveChat/ActiveChat.component';
import Footer from '../../components/Footer/Footer.component';
import { Main } from './HomePage.style';

const HomePage = () => {
	const activeChatId = useSelector((state) => state.chat.currentChatId);

	return (
		<>
			<Main>
				<ChatHistory />
				{activeChatId ? (
					<ActiveChat chatId={activeChatId} />
				) : (
					<StarterScreen />
				)}
			</Main>
			<Footer />
		</>
	);
}

export default HomePage;