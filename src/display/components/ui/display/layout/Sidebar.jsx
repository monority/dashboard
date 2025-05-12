import React from 'react'
import Input from './../../../utils/base/Input';
import Icon from '../../../utils/Icon';
import { useState } from 'react';
import Button from '../../../utils/base/Button';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState(false);
	return (
		<>
			<div id="sidebar">
				<div className="container">
					<div className="wrapper box">
						<div className="element">
							<p className='text_size2'>Very long username</p>
						</div>
						<div className="element">
							<p className='text_color02 text_size2'>Email@example.com</p>
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
							<h4>Title</h4>
						</div>
						<ul className="sidebar__menu">
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p onClick={() => navigate("/dashboard")}>Dashboard</p>
								</div>
							</li>
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
								<p onClick={() => navigate("/mail")}>Mail</p>

								</div>
							</li>
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
								<p onClick={() => navigate("/task")}>Task</p>
								</div>
							</li>

							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
								<p onClick={() => navigate("/order")}>Order</p>
								</div>
							</li>
						</ul>
					</div>
					<div className="wrapper">
						<div className="element">
							<h4>SubTitle</h4>
						</div>
						<ul className="sidebar__menu">
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Customers</p>
								</div>
							</li>
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Types</p>
								</div>
							</li>
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Support</p>
								</div>
							</li>
							<li className={`${selected && 'selected'} text_size2`}>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Orders</p>
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