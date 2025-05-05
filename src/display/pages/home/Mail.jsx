import React from 'react'
import { useState } from 'react';
import Icon from '../../components/utils/Icon';
import Input from './../../components/utils/base/Input';
import MailCard from '../../components/ui/element/MailCard';
import Button from '../../components/utils/base/Button';

const Mail = () => {
	const mailcontent = [
		{
			id: 1,
			fullName: 'Emma Johnson',
			date: '30 Apr 2025',
			subtitle: 'Project Update - Q2 Dashboard Review',
			content: 'Hi there, just wanted to check in on the dashboard project progress. Can we schedule a review meeting for next week?',
			badge: ['New', 'Important'],
			fullContent: `Hello,
			I wanted to check in on how the dashboard project is coming along. We're approaching the end of Q2 and I'd like to organize a review with stakeholders next week if possible.
			Could you share your availability for either Tuesday or Wednesday afternoon? I think we'll need about 90 minutes to go through all the features and gather feedback.
			Also, if you could prepare a brief demo of the new analytics features we discussed last time, that would be great.
			Looking forward to seeing the progress
			Best regards,
			Emma Johnson
			Product Manager`
		},
		{
			id: 2,
			fullName: 'Tech Newsletter',
			date: '29 Apr 2025',
			subtitle: 'Weekly Dev Updates: React 19 Released',
			content: 'This week in tech: React 19 is out with new concurrency features, GitHub Copilot adds new VS Code extensions, and more.',
			badge: ['Newsletter'],
			fullContent: `Weekly Developer Updates
			React 19 Released
			The React team has officially released version 19, featuring improved concurrency features, better server components support, and reduced bundle sizes.
			GitHub Copilot Expands
			GitHub has introduced new VS Code extensions for Copilot, allowing for better code suggestions and documentation integration.
			Other News:
			- TypeScript 6.0 beta now available
			- Next.js introduces new data fetching APIs
			- Vue.js announces Nuxt 4 roadmap`
		},
		{
			id: 3,
			fullName: 'Michael Chen',
			date: '28 Apr 2025',
			subtitle: 'Design feedback needed',
			content: 'I\'ve shared the new UI mockups in Figma. Could you take a look at the dashboard layout and let me know your thoughts?',
			badge: ['Design'],
			fullContent: `Hi there,
			I've just pushed the latest UI mockups to our shared Figma workspace. The new dashboard layout incorporates the feedback from our last meeting and includes several alternative layouts for the analytics section.
			Could you review them when you get a chance? I'm particularly interested in your thoughts on:
			- The new card-based layout for metrics
			- The revised color scheme for data visualization
			- The mobile responsive behavior
			I'll be available tomorrow afternoon if you want to discuss any of these points in more detail.
			Thanks!
			Michael`
		},
		{
			id: 4,
			fullName: 'Sarah Williams',
			date: '27 Apr 2025',
			subtitle: 'Team meeting rescheduled',
			content: 'Just a quick note that our weekly sync has been moved to Thursday at 2pm instead of Wednesday this week.',
			badge: ['Team'],
			fullContent: `Team,
			Just a quick note that we need to reschedule our weekly sync this week from Wednesday 10am to Thursday 2pm.
			The product team has a conflicting all-hands meeting that several of us need to attend. I've already updated the calendar invite with the new time.
			If anyone has conflicts with the new time, please let me know ASAP so we can find an alternative.
			Best,
			Sarah`
		},
		{
			id: 5,
			fullName: 'Alex Rodriguez',
			date: '26 Apr 2025',
			subtitle: 'API Documentation updated',
			content: 'I\'ve updated the API docs with the new endpoints we discussed. You can find them in the shared Google Drive folder.',
			badge: ['Technical'],
			fullContent: `Hey team,
			I've finished updating our API documentation with the new endpoints we discussed in last week's architecture meeting. You can find the updated docs in our shared Google Drive folder under "Technical Docs > API > v2".
			Key updates include:
			- New analytics data endpoints
			- Improved authentication flow
			- Rate limiting documentation
			- Example requests and responses for each endpoint
			Please review when you get a chance and let me know if you spot any issues or have questions.
			Thanks,
			Alex`
		},
		{
			id: 6,
			fullName: 'Client Solutions',
			date: '25 Apr 2025',
			subtitle: 'Your subscription renewal',
			content: 'Your premium dashboard subscription is due for renewal next week. Save 20% by renewing early!',
			badge: ['Promotion'],
			fullContent: `Hello Valued Customer,
			Your Dashboard Pro subscription is scheduled to renew on May 5, 2025. As a valued customer, we'd like to offer you a special early renewal discount!
			Renew today and save 20% on your annual subscription.
			Your current plan includes:
			- Unlimited dashboards
			- Advanced analytics
			- Priority support
			- Custom integrations
			To take advantage of this offer, simply click the button below and use code EARLY20 at checkout.
			We appreciate your business!
			The Client Solutions Team`
		},
		{
			id: 7,
			fullName: 'Olivia Baker',
			date: '24 Apr 2025',
			subtitle: 'Questions about the chart component',
			content: 'I\'m trying to implement the block chart but having issues with the responsive layout. Do you have any examples?',
			badge: ['Support', 'Urgent'],
			fullContent: `Hi there,
			I'm working on implementing the block chart component for our dashboard and running into some issues with the responsive layout. When the viewport width changes, the charts aren't adjusting properly and sometimes overlap with other elements.
			I've tried following the documentation, but I'm still having trouble. Do you have any working examples of responsive implementations I could look at?
			Also, is there a recommended approach for handling different screen sizes with these charts? Should I be using different chart types for mobile vs desktop?
			This is blocking our release scheduled for next week, so any help would be greatly appreciated!
			Thanks,
			Olivia`
		}
	];


	const [selectedMenu, setSelectedMenu] = useState('Inbox');
	const [selectedMail, setSelectedMail] = useState(mailcontent[0]);

	const handleMenuClick = (menuName) => {
		setSelectedMenu(menuName);
	};

	const handleMailClick = (mail) => {
		setSelectedMail(mail);
	};
	const mailMap = mailcontent.map((mail) => {
		const isSelected = selectedMail && selectedMail.id === mail.id;
		return (
			<div
				key={mail.id}
				className={`${isSelected ? "mail_select mail_box" : "mail_box"}`}
				onClick={() => handleMailClick(mail)}
			>
				<MailCard
					fullName={mail.fullName}
					date={mail.date}
					subtitle={mail.subtitle}
					content={mail.content}
					badge={mail.badge}
				/>
			</div>
		);
	});
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
					<div className="mail_buttons">
						<div className="flex a_center gap1">
							<Icon type="trash" size="2rem" />
							<Icon type="archive" size="1.75rem" />
						</div>
					</div>
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
								<p className='text_size2'>
									{selectedMail.fullContent}

								</p>
							</div>
							<div className="mail_actions pad_base">
								<textarea name="" id="" placeholder='reply' className='textarea'></textarea>
								<Button> Send</Button>
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