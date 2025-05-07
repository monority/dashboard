import React from 'react';
import SmallBox from '../../components/ui/element/SmallBox';
import Sales from '../../components/ui/element/Sales';
import BlockChart from '../../components/ui/element/BlockChart';
import Report from '../../components/ui/element/Report';
import Input from '../../components/utils/base/Input';
import Button from '../../components/utils/base/Button';

const Order = () => {
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const values = [25, 45, 65, 35, 80, 90, 100, 120, 150, 200, 250, 300];

	// Updated reportData with multiple users
	const reportData = [
		{
			id: 1,
			avatar: <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />,
			name: "John Doe",
			email: "john.doe@example.com",
		},
		{
			id: 2,
			avatar: <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />,
			name: "Jane Smith",
			email: "jane.smith@example.com",
		},
		{
			id: 3,
			avatar: <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />,
			name: "Alice Johnson",
			email: "alice.johnson@example.com",
		},
	];

	return (
		<>
			<section className="order">
				<div className="container">
					<div className="wrapper_column gap1">
						<h1>Orders</h1>
					</div>
					<div className="container_side">
						<div className="wrapper_line">
							<SmallBox
								title="Total Revenue"
								typeIcon="money"
								desc="$45,000.00"
								value="20,3"
							/>
							<SmallBox
								title="Subscriptions"
								typeIcon="money"
								desc="2350"
								value="11.7"
							/>
							<SmallBox
								title="Sales"
								typeIcon="money"
								desc="12500"
								value="5.7"
							/>
							<SmallBox
								title="Active now"
								typeIcon="money"
								desc="125"
								value="45"
							/>
						</div>
						<div className="wrapper_sales">
							<Sales />
						</div>
						<div className="wrapper_graph">
							<div className="element_half">
								<BlockChart
									values={values}
									labels={labels}
									title="Sales Overview"
									desc="Sales overview for the last 7 days"
								/>
							</div>
							<div className="element_half">
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
								{reportData.map((user) => (
									<Report
										key={user.id}
										avatar={user.avatar}
										name={user.name}
										email={user.email}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Order;