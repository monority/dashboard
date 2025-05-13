import React from 'react';

const generateRandomValues = (count = 5, min = 10, max = 90) =>
	Array.from({ length: count }, () => Math.floor(Math.random() * (max - min)) + min);

const BlockChart = ({ values, labels, title, desc }) => {

	return (
		<div className="chart-container">

			<div className="chart">
				<div className="chart_wrapper">
					<div className="chart_title">
						<div className="element_row">
							<h3 className="chart-title">{title}</h3>

						</div>
						<div className="element_row">
							<p>{desc}</p>
						</div>
					</div>

					<div className="block_wrapper">

						{values.map((value, i) => (
							<div key={i} className="bar-container">
								<div
									className="bar"
									style={{ height: `${value}px` }}
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