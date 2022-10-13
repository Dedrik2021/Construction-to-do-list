import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import MainLayout from '../pages/MainLayout';
import HomePage from '../pages/HomePage';

import '../scss/style.scss';

function App() {
	return (
		<div className="app">
			<Router>
				<Suspense>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route path="" element={<HomePage />} />
						</Route>
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
