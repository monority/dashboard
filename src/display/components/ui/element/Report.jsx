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
				<div className="container_def">

					<div className="wrapper_between">
						<div className="wrapper">
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
		</>
	)
}

export default Report