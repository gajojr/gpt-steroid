import React, { lazy, Suspense } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.page'));
const GuidePage = lazy(() => import('./pages/GuidePage/GuidePage.page'));
const CreateFineTunePage = lazy(() => import('./pages/CreateFineTunePage/CreateFineTunePage.page'));

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={
					<Suspense fallback={LoadingSpinner()}>
						<HomePage />
					</Suspense>
				} />
				<Route path="/guides/:fileName" element={
					<Suspense fallback={LoadingSpinner()}>
						<GuidePage />
					</Suspense>
				} />
				<Route path="/create-fine-tune" element={
					<Suspense fallback={LoadingSpinner()}>
						<CreateFineTunePage />
					</Suspense>
				} />
			</Routes>
		</Router>
	);
}

export default App;
