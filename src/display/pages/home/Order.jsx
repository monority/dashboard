import React from 'react'
import SmallBox from '../../components/ui/element/SmallBox'
import Sales from '../../components/ui/element/Sales'
import BlockChart from '../../components/ui/element/BlockChart'

const Order = () => {
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const values = [25, 45, 65, 35, 80, 90, 100, 120, 150, 200, 250, 300];
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

							</div>
						</div>
					</div>

				</div>
			</section>
		</>
	)
}

export default Order