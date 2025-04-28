import React from 'react'
import { useState } from 'react';
import Icon from '../../components/utils/Icon';

const Mail = () => {
	const [selectedMenu, setSelectedMenu] = useState('Inbox'); // Default selected item

	const handleMenuClick = (menuName) => {
		setSelectedMenu(menuName);
	};

	return (
		<div id="dashboard" className='mail_page'>
			<div className="container">
				<div className="sidebar">
					<div className="wrapper">
						<div className="element">
							{/* Add content here if needed */}
						</div>
					</div>
					<div className="wrapper">
						<ul>
							<li
								className={selectedMenu === 'Inbox' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Inbox')}
							>
								<div className="element">
									<Icon type="inbox" size="2rem" />
								</div>
								<div className="element">
									<p>Inbox</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Sent' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Sent')}
							>
								<div className="element">
									<Icon type="sent" size="2rem" />
								</div>
								<div className="element">
									<p>Sent</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Drafts' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Drafts')}
							>
								<div className="element">
									<Icon type="draft" size="2rem" />
								</div>
								<div className="element">
									<p>Draft</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Trash' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Trash')}
							>
								<div className="element">
									<Icon type="trash" size="2rem" />
								</div>
								<div className="element">
									<p>Trash</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Archive' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Archive')}
							>
									<div className="element">
									<Icon type="archive" size="1.75rem" />
								</div>
								<div className="element">
									<p>Archive</p>

								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="content">
					<h1>{selectedMenu}</h1>
				</div>
			</div>
		</div>
	)
}

export default Mail