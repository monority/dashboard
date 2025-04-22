import React from 'react'
import Input from './../../../utils/base/Input';
import Icon from '../../../utils/Icon';

const Sidebar = () => {
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
						<Input type="search" placeholder="Search" className="input_default" name="search" />
					</div>
					<div className="wrapper">
						<ul className="sidebar__menu">
							<li className='selected'>
								<div className="element">
									<Icon type="home" size='1.5rem' />
								</div>
								<div className="element">
									<p>Home</p>
								</div>
							</li>
							<li>Home</li>
							<li>Home</li>
							<li>Home</li>
							<li>Home</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar