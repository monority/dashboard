import React from 'react'
import SelectButton from '../../components/utils/base/SelectButton'
import Input from '../../components/utils/base/Input';

const Support = () => {
	const options = [
		{ value: 'technical', label: 'Technical issue' },
		{ value: 'billing', label: 'Billing question' },
		{ value: 'feature', label: 'Feature request' },
		{ value: 'other', label: 'Other' },
	];
	return (
		<>
			<section className="Support">
				<div className="container">
					<div className="wrapper">
						<div className="element">
							<h2>Support </h2>
						</div>
						<div className="element">
							<p className="text_color02">Do you need help ?</p>
						</div>
					</div>
					<div className="wrapper">
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
										<Input type="date" placeholder='Enter your subject' inputClassName="input_search" maxWidth="20rem"  />
									</div>
								</div>
							</div>
						</div>
						<div className="box_graph">
							<div className="wrapper">
								<div className="element"><h3>Number of issues</h3></div>
								<div className="element"></div>
								<div className="element"></div>
							</div>
							<div className="wrapper">
								<div className="element"><h3>Issues solved</h3></div>
								<div className="element"></div>
								<div className="element"></div>
							</div>
							<div className="wrapper">
								<div className="element"><h3>Avg. response time</h3></div>
								<div className="element"></div>
								<div className="element"></div>
							</div>
							<div className="wrapper">
								<div className="element"><h3>Client satisfaction</h3></div>
								<div className="element"></div>
								<div className="element"></div>
							</div>
							<div className="wrapper">
								<div className="element"><h3>Open tickets</h3></div>
								<div className="element"></div>
								<div className="element"></div>
							</div>
						
						</div>
					</div>
				</div>

			</section>
		</>
	)
}

export default Support