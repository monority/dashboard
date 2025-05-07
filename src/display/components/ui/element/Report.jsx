import React from 'react'
import Input from './../../utils/base/Input';
import Button from './../../utils/base/Button';
import Select from '../../utils/base/Select';
import SelectButton from './../../utils/base/SelectButton';
const Report = ({ avatar, name, email }) => {
	const handleSelect = (option) => {
		console.log('Selected option:', option);
	};
	const options = [
		{ value: 'canview', label: 'Can view' },
		{ value: 'option2', label: 'Can edit' },
	];
	return (
		<>
			<div className="report">
				<div className="container">
					<div className="wrapper">
						<div className="element">
							<h1>Share this document</h1>
						</div>
						<div className="element">
							<p>Anyone with this link can view this document.</p>
						</div>
						<div className="wrapper">
							<div className="element">
								<Input type="text" placeholder="https://example.com" />
							</div>
							<div className="element">
								<Button variant="primary" size="large" className="btn_full">Copy link</Button>
							</div>
						</div>

					</div>
					<div className="container">
						<div className="wrapper">
							<div className="element">
								<h3>People with access</h3>
							</div>
							<div className="wrapper">
								<div className="element_between">
									<div className="element">
										{avatar}
									</div>
									<div className="element">
										<p>{name}</p>
										<p>{email}</p>
									</div>

								</div>
								<div className="element">
									<SelectButton options={options} onSelect={handleSelect} />

								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Report