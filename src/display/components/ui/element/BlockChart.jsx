import React from 'react';

const generateRandomValues = (count = 5, min = 10, max = 90) =>
	Array.from({ length: count }, () => Math.floor(Math.random() * (max - min)) + min);

const BlockChart = ({values, labels}) => {

	return (
		<div className="chart-container">

			<div className="chart">
				<div className="chart_wrapper">

					<h3 className="chart-title">Stats</h3>
					<div className="block_wrapper">

						{values.map((value, i) => (
							<div key={i} className="bar-container">
								<div
									className="bar"
									style={{ height: `${value}%` }}
								>
									<span>{value}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="labels">
					{labels.map((label, i) => (
						<div key={i} className="label">
							{label}
						</div>
					))}
				</div>
			</div>

		</div>
	);
};

export default BlockChart;