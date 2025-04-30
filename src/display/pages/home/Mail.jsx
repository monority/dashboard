import React from 'react'
import { useState } from 'react';
import Icon from '../../components/utils/Icon';
import Input from './../../components/utils/base/Input';
import MailCard from '../../components/ui/element/MailCard';

const Mail = () => {
	const [selectedMenu, setSelectedMenu] = useState('Inbox');
	const mailcontent = [
		{
		fullName: 'John Doe',
		date: '24 Aug 2023',
		subtitle: 'meeting tomorrow',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		badge: ['New', 'Important']
	},
		{
		fullName: 'John Doe',
		date: '24 Aug 2023',
		subtitle: 'meeting tomorrow',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		badge: ['New', 'Important']
	},
		{
		fullName: 'John Doe',
		date: '24 Aug 2023',
		subtitle: 'meeting tomorrow',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		badge: ['New', 'Important']
	},
		{
		fullName: 'John Doe',
		date: '24 Aug 2023',
		subtitle: 'meeting tomorrow',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		badge: ['New', 'Important']
	},
	]
	const handleMenuClick = (menuName) => {
		setSelectedMenu(menuName);
	};

	const mailMap = mailcontent.map((mail, index) => {
		return (
			<MailCard
				key={index}
				fullName={mail.fullName}
				date={mail.date}
				subtitle={mail.subtitle}
				content={mail.content}
				badge={mail.badge}
			/>
		)
	})

	return (
		<div id="dashboard" className='mail_page'>
			<div className="container_mail">
				<div className="sidebar border_sidebar">
					<div className="wrapper">
						<div className="element_title">
							<h1>Mail</h1>
						</div>
					</div>
					<div className="wrapper_sidebar">

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
					<div className="wrapper_sidebar">
						<ul>
							<li
								className={selectedMenu === 'Social' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Social')}
							>
								<div className="element">
									<Icon type="group" size="2rem" />
								</div>
								<div className="element">
									<p>Social</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Forum' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Forum')}
							>
								<div className="element">
									<Icon type="sent" size="2rem" />
								</div>
								<div className="element">
									<p>Forum</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Shopping' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Shopping')}
							>
								<div className="element">
									<Icon type="shopping" size="2rem" />
								</div>
								<div className="element">
									<p>Shopping</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Promotion' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Promotion')}
							>
								<div className="element">
									<Icon type="promotion" size="2rem" />
								</div>
								<div className="element">
									<p>Promotion</p>

								</div>
							</li>
							<li
								className={selectedMenu === 'Updates' ? 'menu_item selected' : 'menu_item'}
								onClick={() => handleMenuClick('Updates')}
							>
								<div className="element">
									<Icon type="update" size="1.75rem" />
								</div>
								<div className="element">
									<p>Update</p>

								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="content border_sidebar">
					<div className="element_title">
						<h1>{selectedMenu}</h1>
					</div>
					<div className="container_column pad_inline gap2">
						<div className="wrapper w_100">

							<div className="element">
								<Input
									type="text"
									inputClassName="input_search"
									placeholder='Search'
									icon={<Icon type="search" size="2rem" />}
								/>
							</div>
						</div>
						<div className="container_mailcontent">
							{mailMap}
						</div>
					</div>
				</div>
				<div className="mail_content border_sidebar">
					<div className="element_title">

					</div>
				</div>
			</div>
		</div>
	)
}

export default Mail