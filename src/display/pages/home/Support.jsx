import React from 'react'
import SelectButton from '../../components/utils/base/SelectButton'
import Input from '../../components/utils/base/Input';
import Badge from '../../components/ui/element/Badges';

const Support = () => {
	const options = [
		{ value: 'technical', label: 'Technical issue' },
		{ value: 'billing', label: 'Billing question' },
		{ value: 'feature', label: 'Feature request' },
		{ value: 'other', label: 'Other' },
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
						<div className="wrapper">
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
								<Badge colorBadge="success_light" label="10%" icon="true" /></div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Issues solved</h3></div>
							<div className="element"><p className='text_color02'>this month</p></div>

							<div className="element">55</div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Avg. response time</h3></div>
							<div className="element"><p className='text_color02'>in last 7 days</p></div>

							<div className="flex row gap1"><p>92%</p> <Badge colorBadge="negative" label="2%" iconRed="true" /></div>
						</div>
						<div className="wrapper">
							<div className="element"><h3>Client satisfaction</h3></div>
							<div className="element"><p className='text_color02'>in last 7 days</p></div>

							<div className="flex row gap1">90% 	<Badge colorBadge="success_light" label="10%" icon="true" /></div>
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
						</div>
						<div className="history box_graph">
							<div className="element">
								<h3>Frequently asked questions</h3>
							</div>
						</div>
					</div>

				</div>

			</section>
		</>
	)
}

export default Support