import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App';
import Header from './display/components/ui/display/layout/Header';
import Sidebar from './display/components/ui/display/layout/Sidebar';
import MainContainer from './MainContainer';
import Dashboard from './display/pages/home/Dashboard';
import Mail from './display/pages/home/Mail';
import Task from './display/pages/home/Task';
import Order from './display/pages/home/Order';
import Reviews from './display/pages/home/Reviews';

const Root = () => {
	return (
		<BrowserRouter>
			<Sidebar />
			<MainContainer>
				<Header />
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/mail" element={<Mail />} />
					<Route path="/order" element={<Order />} />
					<Route path="/task" element={<Task />} />
					<Route path="/reviews" element={<Reviews />} />
				</Routes>
			</MainContainer>
		</BrowserRouter>
	)
}

export default Root;

