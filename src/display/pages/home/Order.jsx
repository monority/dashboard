import React from 'react'
import SmallBox from '../../components/ui/element/SmallBox'
import Sales from '../../components/ui/element/Sales'

const Order = () => {
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
					</div>

				</div>
			</section>
		</>
	)
}

export default Order