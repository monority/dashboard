import React from 'react'
import { useState } from 'react';
import Icon from '../../components/utils/Icon';
import Input from './../../components/utils/base/Input';
import MailCard from '../../components/ui/element/MailCard';

const Mail = () => {
	const [selectedMenu, setSelectedMenu] = useState('Inbox');
	const [selectedMail, setSelectedMail] = useState(null);

	const mailcontent = [
		{
			id: 1,
			fullName: 'Emma Johnson',
			date: '30 Apr 2025',
			subtitle: 'Project Update - Q2 Dashboard Review',
			content: 'Hi there, just wanted to check in on the dashboard project progress. Can we schedule a review meeting for next week?',
			badge: ['New', 'Important'],
			fullContent: `
            <p>Hello,</p>
            <p>I wanted to check in on how the dashboard project is coming along. We're approaching the end of Q2 and I'd like to organize a review with stakeholders next week if possible.</p>
            <p>Could you share your availability for either Tuesday or Wednesday afternoon? I think we'll need about 90 minutes to go through all the features and gather feedback.</p>
            <p>Also, if you could prepare a brief demo of the new analytics features we discussed last time, that would be great.</p>
            <p>Looking forward to seeing the progress!</p>
            <p>Best regards,<br>Emma Johnson<br>Product Manager</p>
          `
		},
		// Add fullContent to your other mail items similarly
		{
			id: 2,
			fullName: 'Tech Newsletter',
			date: '29 Apr 2025',
			subtitle: 'Weekly Dev Updates: React 19 Released',
			content: 'This week in tech: React 19 is out with new concurrency features, GitHub Copilot adds new VS Code extensions, and more.',
			badge: ['Newsletter'],
			fullContent: `
            <h2>Weekly Developer Updates</h2>
            <h3>React 19 Released</h3>
            <p>The React team has officially released version 19, featuring improved concurrency features, better server components support, and reduced bundle sizes.</p>
            <h3>GitHub Copilot Expands</h3>
            <p>GitHub has introduced new VS Code extensions for Copilot, allowing for better code suggestions and documentation integration.</p>
            <h3>Other News</h3>
            <p>- TypeScript 6.0 beta now available<br>- Next.js introduces new data fetching APIs<br>- Vue.js announces Nuxt 4 roadmap</p>
          `
		}
	];

	const handleMenuClick = (menuName) => {
		setSelectedMenu(menuName);
	};

	const handleMailClick = (mail) => {
		setSelectedMail(mail);
	};

	const mailMap = mailcontent.map((mail) => {
		return (
			<div key={mail.id} onClick={() => handleMailClick(mail)}>
				<MailCard
					fullName={mail.fullName}
					date={mail.date}
					subtitle={mail.subtitle}
					content={mail.content}
					badge={mail.badge}
				/>
			</div>
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
					{selectedMail ? (
						<>
							<div className="mail_header pad_base">
								<div className="mail_subject">
									<h2>{selectedMail.subtitle}</h2>
								</div>
								<div className="mail_info">
									<div className="mail_sender">
										<h4>{selectedMail.fullName}</h4>
										<p className="mail_date">{selectedMail.date}</p>
									</div>
									<div className="mail_badges">
										{selectedMail.badge && selectedMail.badge.map((badge, index) => (
											<div key={index} className={`badge badge-${badge.toLowerCase()}`}>
												<p>{badge}</p>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="mail_body pad_base">
								<div dangerouslySetInnerHTML={{ __html: selectedMail.fullContent }} />
							</div>
							<div className="mail_actions pad_base">
								<button className="btn_reply">
									<Icon type="reply" size="1.5rem" />
									<span>Reply</span>
								</button>
								<button className="btn_forward">
									<Icon type="forward" size="1.5rem" />
									<span>Forward</span>
								</button>
							</div>
						</>
					) : (
						<div className="no_mail_selected pad_base">
							<div className="mail_placeholder">
								<Icon type="mail" size="4rem" />
								<h3>Select an email to view</h3>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Mail