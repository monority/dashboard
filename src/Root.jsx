import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App';
import Header from './display/components/ui/display/layout/Header';
import Sidebar from './display/components/ui/display/layout/Sidebar';
import MainContainer from './MainContainer';
import Dashboard from './display/pages/home/Dashboard';

const Root = () => {
	return (
		<BrowserRouter>
			<Sidebar />
			<MainContainer>
				<Header />
				<Routes>
					<Route  path="/" element={<App />} />
					<Route  path="/dashboard" element={<Dashboard />} />
				</Routes>
			</MainContainer>
		</BrowserRouter>
	)
}

export default Root;

