import React from 'react'
import Input from './../../../utils/base/Input';
import Icon from '../../../utils/Icon';
import { useState } from 'react';
import Button from '../../../utils/base/Button';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState("dashboard");
	return (
		<>
			<div id="sidebar">
				<div className="container">
					<div className="wrapper box">
						<div className="element">
							<p className=''>Very long username</p>
						</div>
						<div className="element">
							<p className='text_color02 '>Email@example.com</p>
						</div>
					</div>
					<div className="wrapper">
						<Input
							type="text"
							inputClassName="input_search"
							placeholder='Search'
							icon={<Icon type="search" size="2rem" />}
						/>					</div>
					<div className="wrapper">
						<div className="element">
							<h2>Main</h2>
						</div>
						<ul className="sidebar__menu">
							<li
								className={selected === "dashboard" ? "selected" : ""}
								onClick={() => { setSelected("dashboard"); navigate("/dashboard"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Dashboard</p>
								</div>
							</li>
							<li
								className={selected === "mail" ? "selected" : ""}
								onClick={() => { setSelected("mail"); navigate("/mail"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Mail</p>
								</div>
							</li>
							<li
								className={selected === "task" ? "selected" : ""}
								onClick={() => { setSelected("task"); navigate("/task"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Task</p>
								</div>
							</li>
							<li
								className={selected === "order" ? "selected" : ""}
								onClick={() => { setSelected("order"); navigate("/order"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Order</p>
								</div>
							</li>
						</ul>

						<ul className="sidebar__menu">
							<li
								className={selected === "reviews" ? "selected" : ""}
								onClick={() => { setSelected("reviews"); navigate("/reviews"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Reviews</p>
								</div>
							</li>
						z
							<li
								className={selected === "support" ? "selected" : ""}
								onClick={() => { setSelected("support"); navigate("/support"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Support</p>
								</div>
							</li>
							<li
								className={selected === "settings" ? "selected" : ""}
								onClick={() => { setSelected("settings"); navigate("/settings"); }}
							>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Settings</p>
								</div>
							</li>
						</ul>
					</div>
					<div className="wrapper">
						<div className="box__premium">
							<div className="element">
								<h4>Become Pro</h4>
							</div>
							<div className="element">
								<p>Wanna go faster ?</p>
							</div>
							<div className="element">
								<Button>Upgrade</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar