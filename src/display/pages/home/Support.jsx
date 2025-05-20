import React from 'react'
import SelectButton from '../../components/utils/base/SelectButton'
import Input from '../../components/utils/base/Input';
import Badge from '../../components/ui/element/Badges';
import Accordion from '../../components/utils/base/Accordion';

const Support = () => {
	const options = [
		{ value: 'technical', label: 'Technical issue' },
		{ value: 'billing', label: 'Billing question' },
		{ value: 'feature', label: 'Feature request' },
		{ value: 'other', label: 'Other' },
	];

	const faqItems = [
		{
			title: "How can I reset my password?",
			content: "To reset your password, go to the login page and click on 'Forgot password'. Follow the instructions sent to your email."
		},
		{
			title: "Where can I find my invoices?",
			content: "Invoices are available in your account dashboard under the 'Billing' section. You can download them as PDF."
		},
		{
			title: "How do I contact technical support?",
			content: "You can create a new support ticket using the form above or email us directly at support@example.com."
		},
		{
			title: "Can I upgrade my plan at any time?",
			content: "Yes, you can upgrade your plan anytime from the settings page. The changes will be applied immediately."
		}
	];
	const supportHistory = [
		{
			id: 1,
			subject: "Unable to login",
			type: "Technical issue",
			date: "2025-05-10",
			status: "Resolved"
		},
		{
			id: 2,
			subject: "Request invoice for April",
			type: "Billing question",
			date: "2025-05-08",
			status: "Resolved"
		},
		{
			id: 3,
			subject: "Feature suggestion: Dark mode",
			type: "Feature request",
			date: "2025-05-03",
			status: "Closed"
		},
		{
			id: 4,
			subject: "Account upgrade not working",
			type: "Technical issue",
			date: "2025-04-28",
			status: "Resolved"
		},
		{
			id: 5,
			subject: "How to delete my account?",
			type: "Other",
			date: "2025-04-20",
			status: "Answered"
		}
	];
	return (
		<>
			<section className="support">
				<div className="container flex column gap2">
					<div className="wrapper">
						<div className="element">
							<h2>Support </h2>
						</div>
						<div className="element">
							<p className="text_color02">Do you need help ?</p>
						</div>
					</div>

					<div className="box_graph">
						<div className="wrapper">
							<div className="element">
								<h4>Create new ticket</h4>
							</div>
							<div className="element">
								<p className='text_color02'>Fill up the informations below</p>
							</div>
						</div>
						<div className="wrapper_form">
							<div className="container">
								<div className="element">
									<h5>Select request type</h5>
								</div>
								<div className="element">
									<SelectButton options={options} />
								</div>
							</div>
							<div className="container">
								<div className="element">
									<h5>Subject</h5>
								</div>
								<div className="element">
									<Input type="text" placeholder='Enter your problem' inputClassName="input_search" maxWidth="20rem" />
								</div>
							</div>
							<div className="container">
								<div className="element">
									<h5>Date</h5>
								</div>
								<div className="element">
									<Input type="date" placeholder='Enter your subject' inputClassName="input_search" maxWidth="20rem" />
								</div>
							</div>
						</div>
					</div>
					<div className="box_graph wrapper_stats">
						<div className="wrapper">
							<div className="element"><h3>Number of issues</h3></div>
							<div className="element"><p className='text_color02'>this month</p></div>
							<div className="flex row gap1"><p>153</p>
								<Badge colorBadge="success_light" label="10%" icon={true} /></div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Issues solved</h3></div>
							<div className="element"><p className='text_color02'>this month</p></div>

							<div className="element">55</div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Avg. response time</h3></div>
							<div className="element"><p className='text_color02'>in last 7 days</p></div>

							<div className="flex row gap1"><p>92%</p> <Badge colorBadge="negative" label="2%" iconRed={true} /></div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Client satisfaction</h3></div>
							<div className="element"><p className='text_color02'>in last 7 days</p></div>

							<div className="flex row gap1">90% 	<Badge colorBadge="success_light" label="10%" icon={true} /></div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Open tickets</h3></div>
							<div className="element"><p className='text_color02'>in last project</p></div>

							<div className="element">204</div>
						</div>

					</div>
					<div className="wrapper_bottom">
						<div className="fag box_graph">
							<div className="element">
								<h3>Frequently asked questions</h3>
							</div>
							<div className="element">
								<Accordion items={faqItems} />
							</div>
						</div>
						<div className="history box_graph">
							<div className="element">
								<h3>Support history</h3>
							</div>
							<div className="element">
								<div className="support-history-table" style={{ overflowX: 'auto' }}>
									<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98em' }}>
										<thead>
											<tr>
												<th style={{ textAlign: 'left', padding: '0.5em 0.7em' }}>Subject</th>
												<th style={{ textAlign: 'left', padding: '0.5em 0.7em' }}>Type</th>
												<th style={{ textAlign: 'left', padding: '0.5em 0.7em' }}>Date</th>
												<th style={{ textAlign: 'left', padding: '0.5em 0.7em' }}>Status</th>
											</tr>
										</thead>
										<tbody>
											{supportHistory.map((item) => (
												<tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
													<td style={{ padding: '0.5em 0.7em' }}>{item.subject}</td>
													<td style={{ padding: '0.5em 0.7em' }}>{item.type}</td>
													<td style={{ padding: '0.5em 0.7em' }}>{new Date(item.date).toLocaleDateString()}</td>
													<td style={{ padding: '0.5em 0.7em' }}>
														<span
															style={{
																color:
																	item.status === "Resolved"
																		? "#388e3c"
																		: item.status === "Closed"
																			? "#1976d2"
																			: "#f57c00",
																fontWeight: 500
															}}
														>
															{item.status}
														</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>

			</section>
		</>
	)
}

export default Support